import { ObjectId } from 'mongodb';

export interface ITodo {
  author: ObjectId | string;
  title: string;
  description?: string;
  is_today: boolean;
  created_at: Date;
  updated_at?: Date;
  tag?: string;
  tasks: ITask[];
}

export interface ITask {
  _id: ObjectId | string;
  list_id: ObjectId | string;
  title: string;
  description?: string;
  completed: boolean;
  created_at: Date;
  updated_at?: Date;
  tag?: string;
}
