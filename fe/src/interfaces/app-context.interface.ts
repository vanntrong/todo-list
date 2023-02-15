import { IListTask } from "@/modules/home/interfaces/task.interface";
import { Dispatch, SetStateAction } from "react";
import { IUser } from "./common.interface";

export interface AppContextInterface {
  list_tasks: IListTask[];
  user?: IUser;
  changeUser: (user: IUser) => void;
}
