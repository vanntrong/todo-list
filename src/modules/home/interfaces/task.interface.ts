export interface ITask {
  _id: string;
  list_id: string;
  title: string;
  description?: string;
  completed: boolean;
  created_at: Date;
  updated_at?: Date;
  tag?: string;
}

export interface IListTask {
  author: string;
  title: string;
  description?: string;
  is_today: boolean;
  created_at: Date;
  updated_at?: Date;
  tag?: string;
  tasks: ITask[];
  _id: string;
}
