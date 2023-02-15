import { DB_MODULE_TOKEN } from '@/loaders';
import { Inject, Injectable } from '@nestjs/common';
import { Collection, Db } from 'mongodb';
import { IUser } from './users.interface';

export const USERS_COLLECTION = 'users';
@Injectable()
export class UsersModel {
  private readonly _collection: Collection<IUser>;
  constructor(@Inject(DB_MODULE_TOKEN) private db: Db) {
    this._collection = this.db.collection<IUser>(USERS_COLLECTION);

    // Create index
    this._collection.createIndex(
      { email: 1, _id: 1, full_name: 'text' },
      { unique: true },
    );
  }

  public get collection(): Collection<IUser> {
    return this._collection;
  }
}
