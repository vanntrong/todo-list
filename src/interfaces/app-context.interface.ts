import { Task } from "@/modules/home/interfaces/task.interface";
import { Dispatch, SetStateAction } from "react";
import { User } from "./common.interface";

export interface AppContextInterface {
  user?: User;
  tasks: Task[];
  setTasks?: Dispatch<SetStateAction<Task[]>>;
}
