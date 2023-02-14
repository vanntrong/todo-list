import { User, WithoutId } from "@/interfaces";
import request from "@/utils/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "../interfaces/task.interface";
import { USE_GET_TASKS_QUERY_KEY } from "./useGetTasks";

const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ["tasks"],
    async (id: string) => {
      return request.post<WithoutId<Task>, Task>(`/delete-task?id=${id}`);
    },
    {
      onSuccess(data) {
        queryClient.setQueryData<User & { tasks: Task[] }>(
          [USE_GET_TASKS_QUERY_KEY],
          (oldData) => {
            return oldData
              ? {
                  ...oldData,
                  tasks: oldData.tasks.filter((task) => task.id !== data.id),
                }
              : oldData;
          }
        );
      },
    }
  );
};

export default useDeleteTask;
