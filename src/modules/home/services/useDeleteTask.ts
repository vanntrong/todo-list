import { IUser, WithoutId } from "@/interfaces";
import request from "@/utils/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ITask } from "../interfaces/task.interface";
import { USE_GET_TASKS_QUERY_KEY } from "./useGetTasks";

interface IDeleteTaskPayload {
  id: string;
  listId: string;
}

const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ["tasks"],
    async ({ id, listId }: IDeleteTaskPayload) => {
      return request.post<WithoutId<ITask>, ITask>(
        `/delete-task?id=${id}&listId=${listId}`
      );
    },
    {
      onSuccess(data) {
        queryClient.invalidateQueries([USE_GET_TASKS_QUERY_KEY]);
      },
    }
  );
};

export default useDeleteTask;
