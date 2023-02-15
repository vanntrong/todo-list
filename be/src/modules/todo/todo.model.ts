import { DB_MODULE_TOKEN } from '@/loaders';
import { Inject, Injectable } from '@nestjs/common';
import { Collection, Db } from 'mongodb';
import { ITodo } from './todo.interface';

export const TODO_COLLECTION = 'todos';

@Injectable()
export class TodoModel {
  private readonly _collection: Collection<ITodo>;

  constructor(@Inject(DB_MODULE_TOKEN) private db: Db) {
    this._collection = this.db.collection<ITodo>(TODO_COLLECTION);

    // Create index
    this._collection.createIndex({ title: 'text', id: 1 }, { unique: true });
  }

  public get collection(): Collection<ITodo> {
    return this._collection;
  }
}
