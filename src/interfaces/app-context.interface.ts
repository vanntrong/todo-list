import { Task } from "@/modules/home/interfaces/task.interface";
import { User } from "./common.interface";

export interface AppContextInterface {
  user?: User;
  tasks: Task[];
}
