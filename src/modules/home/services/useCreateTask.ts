import { WithoutId } from "@/interfaces";
import request from "@/utils/request";
import { useMutation } from "@tanstack/react-query";
import { Task } from "../interfaces/task.interface";

const useCreateTask = () => {
  return useMutation(["tasks"], async (payload: WithoutId<Task>) => {
    return request.post<WithoutId<Task>, Task>("/create-task", payload);
  });
};

export default useCreateTask;
