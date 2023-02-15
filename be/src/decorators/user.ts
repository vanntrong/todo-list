import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IUserFromToken {
  _id: string;
  full_name: string;
  email: string;
  iat: number;
  exp: number;
}

export const User = createParamDecorator<IUserFromToken>(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: IUserFromToken = request.user;
    return user;
  },
);
