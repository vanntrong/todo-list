import { AppContextInterface } from "@/interfaces/app-context.interface";
import useGetTasks from "@/modules/home/services/useGetTasks";
import { createContext, FC, PropsWithChildren } from "react";

const AppContext = createContext<AppContextInterface>({
  user: undefined,
  tasks: [],
});

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: { tasks = [], id = "", name = "" } = {} } = useGetTasks();

  return (
    <AppContext.Provider value={{ tasks, user: { id, name } }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
