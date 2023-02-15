import { JwtAuthGuard } from '@/guards/jwt.guard';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Put,
  Param,
  Get,
  Delete,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import {
  CreateTaskDto,
  CreateTodoDto,
  UpdateTaskDto,
  UpdateOrderTaskDto,
} from './todo.dto';
import { TodoService } from './todo.service';
import { User, IUserFromToken } from '@/decorators/user';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createTodo(@Body() todo: CreateTodoDto, @User() user: IUserFromToken) {
    return this.todoService.createTodo(todo, user._id);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getTodos(@User() user: IUserFromToken) {
    return this.todoService.getTodos(user._id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateTodo() {
    return 'updateTodo';
  }

  @Post(':id/tasks')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createTask(
    @Body() task: CreateTaskDto,
    @Param('id') id: string,
    @User() user: IUserFromToken,
  ) {
    return await this.todoService.createTask(task, id, user._id);
  }

  @Put(':id/tasks/:taskId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateTask(
    @Body() task: UpdateTaskDto,
    @Param('id') id: string,
    @Param('taskId') taskId: string,
    @User() user: IUserFromToken,
  ) {
    return this.todoService.updateTask(task, id, taskId, user._id);
  }

  @Delete(':id/tasks/:taskId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse()
  async deleteTask(
    @Param('id') id: string,
    @Param('taskId') taskId: string,
    @User() user: IUserFromToken,
  ) {
    return this.todoService.deleteTask(id, taskId, user._id);
  }

  @Patch('order')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updateOrder(
    @Body() body: UpdateOrderTaskDto,
    @User() user: IUserFromToken,
  ) {
    return this.todoService.updateOrder(body, user._id);
  }
}
