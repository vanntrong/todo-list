import request from "@/utils/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IListTask } from "../interfaces/task.interface";
import { USE_GET_TASKS_QUERY_KEY } from "./useGetTasks";

interface IUpdateOrderTask {
  sourceId: string;
  sourceIndex: number;
  destinationId: string;
  destinationIndex: number;
}

const useUpdateOrderTask = () => {
  const queryClient = useQueryClient();
  // useSwapTask({ ...order });
  return useMutation(["updateOrderTask"], async (order: IUpdateOrderTask) => {
    queryClient.setQueryData<IListTask[]>(
      [USE_GET_TASKS_QUERY_KEY],
      (oldData) => {
        if (!oldData) return oldData;
        const source = oldData.find((l) => l._id === order.sourceId);
        const destination = oldData.find((l) => l._id === order.destinationId);
        if (!source || !destination) return oldData;

        const [removed] = source.tasks.splice(order.sourceIndex, 1);
        destination.tasks.splice(order.destinationIndex, 0, removed);

        return oldData;
      }
    );

    return request.patch<IUpdateOrderTask, IUpdateOrderTask>(
      "/todos/order",
      order
    );
  });
};

export default useUpdateOrderTask;
