import { IUser, WithoutId } from "@/interfaces";
import request from "@/utils/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ITask } from "../interfaces/task.interface";
import { USE_GET_TASKS_QUERY_KEY } from "./useGetTasks";

const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ["tasks", "update"],
    async (task: ITask | Partial<ITask>) => {
      return request.put<ITask, ITask>(
        `/todos/${task.list_id}/tasks/${task._id}`,
        task
      );
    },
    {
      onSuccess() {
        queryClient.invalidateQueries([USE_GET_TASKS_QUERY_KEY]);
      },
    }
  );
};

export default useUpdateTask;
