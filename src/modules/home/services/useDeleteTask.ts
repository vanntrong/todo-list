import { WithoutId } from "@/interfaces";
import request from "@/utils/request";
import { useMutation } from "@tanstack/react-query";
import { Task } from "../interfaces/task.interface";

const useDeleteTask = () => {
  return useMutation(["tasks"], async (id: string) => {
    return request.post<WithoutId<Task>, Task>(`/delete-task?id=${id}`);
  });
};

export default useDeleteTask;
