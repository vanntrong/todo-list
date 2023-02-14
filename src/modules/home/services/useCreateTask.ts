import { User, WithoutId } from "@/interfaces";
import request from "@/utils/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "../interfaces/task.interface";
import { USE_GET_TASKS_QUERY_KEY } from "./useGetTasks";

const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ["tasks"],
    async (payload: WithoutId<Task>) => {
      return request.post<WithoutId<Task>, Task>("/create-task", payload);
    },
    {
      onSuccess(data) {
        queryClient.setQueryData<User & { tasks: Task[] }>(
          [USE_GET_TASKS_QUERY_KEY],
          (oldData) => {
            return oldData
              ? {
                  ...oldData,
                  tasks: [...oldData.tasks, data],
                }
              : oldData;
          }
        );
      },
    }
  );
};

export default useCreateTask;
