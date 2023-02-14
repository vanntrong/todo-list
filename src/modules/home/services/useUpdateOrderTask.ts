import request from "@/utils/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USE_GET_TASKS_QUERY_KEY } from "./useGetTasks";

const useUpdateOrderTask = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ["updateOrderTask"],
    async (order: any) => {
      return request.post("/update-task-order", order);
    },
    {
      onSuccess(data, variables, context) {
        // queryClient.invalidateQueries([USE_GET_TASKS_QUERY_KEY]);
      },
    }
  );
};

export default useUpdateOrderTask;
