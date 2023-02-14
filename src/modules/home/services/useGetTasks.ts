import { IUser } from "@/interfaces";
import request from "@/utils/request";
import { useQuery } from "@tanstack/react-query";

export const USE_GET_TASKS_QUERY_KEY = "tasks";

const useGetTasks = () => {
  return useQuery(
    [USE_GET_TASKS_QUERY_KEY],
    async () => {
      return request.get<void, IUser>("/user-tasks");
    },
    {
      placeholderData: {
        id: "1",
        name: "John Doe",
        list_tasks: [],
      },
    }
  );
};

export default useGetTasks;
