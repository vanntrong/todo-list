import request from "@/utils/request";
import { useQuery } from "@tanstack/react-query";
import { Task } from "../interfaces/task.interface";

export interface UseGetTasksResponse {
  id: string;
  name: string;
  tasks: Task[];
}

export const USE_GET_TASKS_QUERY_KEY = "tasks";

const useGetTasks = () => {
  return useQuery(
    [USE_GET_TASKS_QUERY_KEY],
    async () => {
      return request.get<void, UseGetTasksResponse>("/user-tasks");
    },
    {
      placeholderData: {
        id: "1",
        name: "John Doe",
        tasks: [],
      },
    }
  );
};

export default useGetTasks;
