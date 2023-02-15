import { DBModule } from '@/loaders';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersModel } from './users.model';
import { UsersService } from './users.service';

@Module({
  imports: [DBModule],
  providers: [UsersModel, UsersService],
  controllers: [UsersController],
  exports: [UsersModel, UsersService],
})
export class UserModule {}
