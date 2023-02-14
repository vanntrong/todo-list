import { User, WithoutId } from "@/interfaces";
import request from "@/utils/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "../interfaces/task.interface";
import { USE_GET_TASKS_QUERY_KEY } from "./useGetTasks";

const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ["tasks"],
    async (task: Task | (WithoutId<Task> & { id: string })) => {
      return request.put<Task, Task>(`/update-task`, task);
    },
    {
      onSuccess(data) {
        queryClient.setQueryData<User & { tasks: Task[] }>(
          [USE_GET_TASKS_QUERY_KEY],
          (oldData) => {
            return oldData
              ? {
                  ...oldData,
                  tasks: oldData.tasks.map((task) =>
                    task.id === data.id ? data : task
                  ),
                }
              : oldData;
          }
        );
      },
    }
  );
};

export default useUpdateTask;
