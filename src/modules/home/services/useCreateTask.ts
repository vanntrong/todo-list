import { IUser, WithoutId } from "@/interfaces";
import request from "@/utils/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ITask } from "../interfaces/task.interface";
import { USE_GET_TASKS_QUERY_KEY } from "./useGetTasks";

const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ["tasks"],
    async (payload: ITask | WithoutId<ITask>) => {
      return request.post<WithoutId<ITask>, ITask>("/create-task", payload);
    },
    {
      onSuccess(data) {
        queryClient.setQueryData<IUser>(
          [USE_GET_TASKS_QUERY_KEY],
          (oldData) => {
            return oldData
              ? {
                  ...oldData,
                  list_tasks: oldData.list_tasks.map((list) =>
                    list.id === data.listId
                      ? { ...list, tasks: [...list.tasks, data] }
                      : list
                  ),
                }
              : oldData;
          }
        );
      },
    }
  );
};

export default useCreateTask;
