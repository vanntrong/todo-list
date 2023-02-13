import request from "@/utils/request";
import { useQuery } from "@tanstack/react-query";
import { Task } from "../interfaces/task.interface";

interface Response {
  id: string;
  name: string;
  tasks: Task[];
}

const useGetTasks = () => {
  return useQuery(["tasks"], async () => {
    return request.get<void, Response>("/user-tasks");
  });
};

export default useGetTasks;
