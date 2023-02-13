import { User } from "@/interfaces";
import { AppContextInterface } from "@/interfaces/app-context.interface";
import { Task } from "@/modules/home/interfaces/task.interface";
import useGetTasks from "@/modules/home/services/useGetTasks";
import { createContext, FC, useEffect, useState } from "react";

const AppContext = createContext<AppContextInterface>({
  user: undefined,
  tasks: [],
});

export const AppProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const { data } = useGetTasks();

  useEffect(() => {
    if (data) {
      setUser({ id: data.id, name: data.name });
      setTasks(data.tasks);
    }
  }, [data]);

  return (
    <AppContext.Provider value={{ tasks: tasks, setTasks, user }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
