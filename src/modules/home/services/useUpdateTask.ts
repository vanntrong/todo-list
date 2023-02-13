import { WithoutId } from "@/interfaces";
import request from "@/utils/request";
import { useMutation } from "@tanstack/react-query";
import { Task } from "../interfaces/task.interface";

const useUpdateTask = () => {
  return useMutation(
    ["tasks"],
    async (task: Task | (WithoutId<Task> & { id: string })) => {
      return request.put<Task, Task>(`/update-task`, task);
    }
  );
};

export default useUpdateTask;
