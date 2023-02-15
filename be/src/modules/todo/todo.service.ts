import { AppError } from '@/errors/AppError';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Collection, Logger, ObjectId } from 'mongodb';
import {
  CreateTaskDto,
  CreateTodoDto,
  UpdateOrderTaskDto,
  UpdateTaskDto,
} from './todo.dto';
import { ITask, ITodo } from './todo.interface';
import { TodoModel } from './todo.model';

@Injectable()
export class TodoService {
  private readonly todoCollection: Collection<ITodo>;
  private readonly logger: Logger;

  constructor(private todoModel: TodoModel) {
    this.todoCollection = this.todoModel.collection;
    this.logger = new Logger(TodoService.name);
  }

  /**
   * It creates a new todo and returns the newly created todo
   * @param {CreateTodoDto} todo - CreateTodoDto
   * @param {string} author - string
   * @returns The return type is a promise.
   */
  async createTodo(todo: CreateTodoDto, author: string) {
    try {
      const newTodo: ITodo = {
        ...todo,
        author: new ObjectId(author),
        created_at: new Date(),
        updated_at: new Date(),
        tasks: [],
      };

      const { acknowledged } = await this.todoCollection.insertOne(newTodo);

      if (!acknowledged) {
        throw new AppError(
          'Failed to create todo',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        data: newTodo,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  /**
   * It creates a new task in a todo list
   * @param {CreateTaskDto} task - CreateTaskDto
   * @param {string} todoId - string, author: string
   * @param {string} author - string - this is the user id
   */
  async createTask(task: CreateTaskDto, todoId: string, author: string) {
    try {
      await this.$checkTodoExist(todoId, author);

      const newTask: ITask = {
        ...task,
        _id: new ObjectId(),
        list_id: new ObjectId(todoId),
        completed: false,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const { acknowledged } = await this.todoCollection.updateOne(
        { _id: new ObjectId(todoId) },
        { $push: { tasks: newTask } },
      );

      if (!acknowledged) {
        throw new AppError(
          'Failed to create task',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        data: newTask,
      };
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  /**
   * It updates a task in a todo list.
   * @param {UpdateTaskDto} task - UpdateTaskDto,
   * @param {string} id - string,
   * @param {string} taskId - string,
   * @param {string} author - string - the user who created the todo
   * @returns The updated task
   */
  async updateTask(
    task: UpdateTaskDto,
    id: string,
    taskId: string,
    author: string,
  ) {
    try {
      await this.$checkTodoExist(id, author);

      const { acknowledged } = await this.todoCollection.updateOne(
        {
          _id: new ObjectId(id),
          'tasks._id': new ObjectId(taskId),
        },
        {
          $set: Object.assign(
            {},
            task.title && { 'tasks.$.title': task.title },
            task.description && { 'tasks.$.description': task.description },
            task.tag && { 'tasks.$.tag': task.tag },
            { 'tasks.$.completed': task.completed },
            { 'tasks.$.updated_at': new Date() },
          ),
        },
      );

      if (!acknowledged) {
        throw new AppError(
          'Failed to update task',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return {
        data: task,
      };
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  /**
   * It returns a list of todos for a given author.
   * @param {string} authorId - string
   * @returns An array of todos.
   */
  async getTodos(authorId: string) {
    try {
      const todos = await this.todoCollection
        .find({
          author: new ObjectId(authorId),
        })
        .toArray();

      return {
        data: todos,
      };
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  /**
   * This function deletes a task from a todo list.
   * @param {string} todoId - string, taskId: string, author: string
   * @param {string} taskId - string, author: string
   * @param {string} author - string - the user who created the todo
   * @returns Nothing.
   */
  async deleteTask(todoId: string, taskId: string, author: string) {
    try {
      await this.$checkTodoExist(todoId, author);

      const { acknowledged } = await this.todoCollection.updateOne(
        {
          _id: new ObjectId(todoId),
          'tasks._id': new ObjectId(taskId),
        },
        {
          $pull: {
            tasks: {
              _id: new ObjectId(taskId),
            },
          },
        },
      );

      if (!acknowledged) {
        throw new AppError(
          'Failed to delete task',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  /**
   * It takes in a sourceId, sourceIndex, destinationId, destinationIndex, author, and returns nothing
   * @param {UpdateOrderTaskDto}  - UpdateOrderTaskDto
   * @param {string} author - string - the user id
   * @returns Nothing.
   */
  async updateOrder(
    {
      sourceId,
      sourceIndex,
      destinationId,
      destinationIndex,
    }: UpdateOrderTaskDto,
    author: string,
  ) {
    try {
      const [source, destination] = await Promise.all([
        this.todoCollection.findOne({
          _id: new ObjectId(sourceId),
          author: new ObjectId(author),
        }),
        this.todoCollection.findOne({
          _id: new ObjectId(destinationId),
          author: new ObjectId(author),
        }),
      ]);

      if (!source || !destination) {
        throw new AppError('Todo not found', HttpStatus.NOT_FOUND);
      }

      if (source._id.toString() === destination._id.toString()) {
        const [removed] = source.tasks.splice(sourceIndex, 1);
        source.tasks.splice(destinationIndex, 0, removed);

        await this.todoCollection.updateOne(
          {
            _id: new ObjectId(sourceId),
          },
          {
            $set: {
              tasks: source.tasks,
            },
          },
        );
      } else {
        const [removed] = source.tasks.splice(sourceIndex, 1);
        destination.tasks.splice(destinationIndex, 0, removed);
        await Promise.all([
          this.todoCollection.updateOne(
            {
              _id: new ObjectId(sourceId),
              author: new ObjectId(author),
            },
            {
              $set: {
                tasks: source.tasks,
              },
            },
          ),
          this.todoCollection.updateOne(
            {
              _id: new ObjectId(destinationId),
              author: new ObjectId(author),
            },
            {
              $set: {
                tasks: destination.tasks,
              },
            },
          ),
        ]);
      }

      return;
    } catch (error) {
      this.logger.error(error.message);
      throw error;
    }
  }

  /**
   * This function checks if a todo exists in the database, if it doesn't, it throws an error.
   * @param {string} todoId - string - the id of the todo
   * @param {string} author - string
   */
  async $checkTodoExist(todoId: string, author: string) {
    const todoExist = await this.todoCollection.findOne({
      _id: new ObjectId(todoId),
      author: new ObjectId(author),
    });

    if (!todoExist) {
      throw new AppError('Todo not found', HttpStatus.NOT_FOUND);
    }
  }
}
