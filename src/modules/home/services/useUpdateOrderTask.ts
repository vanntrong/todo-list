import { IUser } from "@/interfaces";
import request from "@/utils/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USE_GET_TASKS_QUERY_KEY } from "./useGetTasks";

interface IUpdateOrderTask {
  sourceId: string;
  sourceIndex: number;
  destinationId: string;
  destinationIndex: number;
}

const useUpdateOrderTask = () => {
  const queryClient = useQueryClient();

  return useMutation(["updateOrderTask"], async (order: IUpdateOrderTask) => {
    queryClient.setQueryData<IUser>([USE_GET_TASKS_QUERY_KEY], (oldData) => {
      if (!oldData) return oldData;
      const source = oldData.list_tasks.find((l) => l.id === order.sourceId);
      const destination = oldData.list_tasks.find(
        (l) => l.id === order.destinationId
      );
      if (source && destination) {
        if (source.id === destination.id) {
          const [removed] = source.tasks.splice(order.sourceIndex, 1);
          destination.tasks.splice(order.destinationIndex, 0, removed);
        }
      }

      return oldData;
    });
    return request.post<IUpdateOrderTask, IUpdateOrderTask>(
      "/update-task-order",
      order
    );
  });
};

export default useUpdateOrderTask;
