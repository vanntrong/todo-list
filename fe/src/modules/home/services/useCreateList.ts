import { WithoutId } from "@/interfaces";
import request from "@/utils/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IListTask } from "../interfaces/task.interface";
import { USE_GET_TASKS_QUERY_KEY } from "./useGetTasks";

const useCreateList = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ["list", "create"],
    async (payload: IListTask | WithoutId<IListTask>) => {
      return request.post<WithoutId<IListTask>, IListTask>(`/todos`, payload);
    },
    {
      onSuccess(data) {
        queryClient.setQueryData<IListTask[]>(
          [USE_GET_TASKS_QUERY_KEY],
          (oldData) => {
            return oldData ? [...oldData, data] : oldData;
          }
        );
      },
    }
  );
};

export default useCreateList;
