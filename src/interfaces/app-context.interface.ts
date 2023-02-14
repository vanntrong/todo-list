import { IListTask } from "@/modules/home/interfaces/task.interface";
import { IUser } from "./common.interface";

export interface AppContextInterface {
  user?: IUser;
  list_tasks: IListTask[];
}
