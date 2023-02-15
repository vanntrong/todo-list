import { IUser, WithoutId } from "@/interfaces";
import request from "@/utils/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ITask } from "../interfaces/task.interface";
import { USE_GET_TASKS_QUERY_KEY } from "./useGetTasks";

interface IDeleteTaskPayload {
  id: string;
  list_id: string;
}

const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ["tasks"],
    async ({ id, list_id }: IDeleteTaskPayload) => {
      return request.delete<WithoutId<ITask>, ITask>(
        `/todos/${list_id}/tasks/${id}`
      );
    },
    {
      onSuccess() {
        queryClient.invalidateQueries([USE_GET_TASKS_QUERY_KEY]);
      },
    }
  );
};

export default useDeleteTask;
