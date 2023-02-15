import { DBModule } from '@/loaders';
import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoModel } from './todo.model';
import { TodoService } from './todo.service';

@Module({
  imports: [DBModule],
  controllers: [TodoController],
  providers: [TodoModel, TodoService],
  exports: [TodoModel, TodoService],
})
export class TodoModule {}
