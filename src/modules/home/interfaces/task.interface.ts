export interface ITask {
  title: string;
  description?: string;
  id: string;
  completed: boolean;
  listId: string;
}

export interface IListTask {
  id: string;
  title: string;
  tasks: ITask[];
}
