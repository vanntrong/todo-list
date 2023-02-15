import { getCookie } from "@/utils";
import request from "@/utils/request";
import { useQuery } from "@tanstack/react-query";
import { IListTask } from "../interfaces/task.interface";

export const USE_GET_TASKS_QUERY_KEY = "tasks";

const useGetTasks = () => {
  const token = getCookie("access_token");
  return useQuery(
    [USE_GET_TASKS_QUERY_KEY],
    async () => {
      return request.get<void, IListTask[]>("/todos/me");
    },
    {
      enabled: !!token,
    }
  );
};

export default useGetTasks;
