import configuration from '@/config/configuration';
import { AppError } from '@/errors/AppError';
import { ResponseType, TokenResponse } from '@/types/common';
import { toUserResponse } from '@/utils/helper';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { pick } from 'lodash';
import { Collection } from 'mongodb';
import { UsersModel } from '../users/users.model';
import { IUser, IUserResponse } from '../users/users.interface';
import { LoginDto, SignUpDto } from './auth.dto';
import { TodoService } from '../todo/todo.service';

@Injectable()
export class AuthService {
  private readonly userCollection: Collection<IUser>;
  private readonly logger: Logger;

  constructor(
    private usersModel: UsersModel,
    private jwtService: JwtService,
    private todoService: TodoService,
  ) {
    this.userCollection = this.usersModel.collection;
    this.logger = new Logger(AuthService.name);
  }

  hashPassword(password: string) {
    return bcryptjs.hashSync(password, 10);
  }

  validatePassword(password: string, hashedPassword: string) {
    return bcryptjs.compareSync(password, hashedPassword);
  }

  async genToken(payload: IUser) {
    try {
      const fieldToSign = pick(payload, ['_id', 'full_name', 'email']);
      const config = configuration();
      const [access_token, refresh_token] = await Promise.all([
        this.jwtService.signAsync(fieldToSign, {
          secret: config.ACCESS_TOKEN_SECRET,
          expiresIn: config.ACCESS_TOKEN_LIFE,
          algorithm: 'HS256',
        }),
        this.jwtService.signAsync(fieldToSign, {
          secret: config.REFRESH_TOKEN_SECRET,
          expiresIn: config.REFRESH_TOKEN_LIFE,
          algorithm: 'HS256',
        }),
      ]);

      return {
        access_token,
        refresh_token,
        exp: config.ACCESS_TOKEN_LIFE,
      };
    } catch (error) {
      this.logger.error('Gen token error', error);
      return null;
    }
  }

  async signup(
    payload: SignUpDto,
  ): Promise<ResponseType<IUserResponse & { tokens: TokenResponse }>> {
    const isDuplicate = !!(await this.userCollection.countDocuments({
      email: payload.email,
    }));

    if (isDuplicate) {
      throw new AppError('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = this.hashPassword(payload.password);

    const user: IUser = {
      ...payload,
      avatar: 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png',
      password: hashedPassword,
      is_deleted: false,
      created_at: new Date(),
    };

    const { acknowledged, insertedId } = await this.userCollection.insertOne(
      user,
    );

    if (!acknowledged) {
      this.logger.error(`Failed to insert user ${user.email}`);
      throw new AppError(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    this.todoService.createTodo(
      {
        title: 'Welcome to Todo App',
        description: 'This is your first todo',
        tag: 'welcome',
        is_today: true,
      },
      insertedId.toString(),
    );

    const tokens = await this.genToken(user);

    this.logger.log(`User signed up:::${user.email}`);
    return {
      data: { ...toUserResponse(user), tokens: tokens },
    };
  }

  async login(
    payload: LoginDto,
  ): Promise<ResponseType<IUserResponse & { tokens: TokenResponse }>> {
    const user = await this.userCollection.findOne({
      email: payload.email,
      is_deleted: false,
    });

    if (!user) {
      throw new AppError(
        'Email or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isMatch = this.validatePassword(payload.password, user.password);

    if (!isMatch) {
      throw new AppError(
        'Email or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    const tokens = await this.genToken(user);

    this.logger.log(`User login:::${user.email}`);
    return {
      data: { ...toUserResponse(user), tokens: tokens },
    };
  }
}
