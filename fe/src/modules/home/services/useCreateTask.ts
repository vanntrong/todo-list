import { IUser, WithoutId } from "@/interfaces";
import request from "@/utils/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IListTask, ITask } from "../interfaces/task.interface";
import { USE_GET_TASKS_QUERY_KEY } from "./useGetTasks";

const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ["tasks", "create"],
    async (payload: ITask | WithoutId<ITask>) => {
      return request.post<WithoutId<ITask>, ITask>(
        `/todos/${payload.list_id}/tasks`,
        payload
      );
    },
    {
      onSuccess(data) {
        queryClient.setQueryData<IListTask[]>(
          [USE_GET_TASKS_QUERY_KEY],
          (oldData) => {
            return oldData
              ? oldData.map((list) =>
                  list._id === data.list_id
                    ? { ...list, tasks: [...list.tasks, data] }
                    : list
                )
              : oldData;
          }
        );
      },
    }
  );
};

export default useCreateTask;
