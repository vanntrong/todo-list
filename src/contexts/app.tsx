import { AppContextInterface } from "@/interfaces/app-context.interface";
import useGetTasks from "@/modules/home/services/useGetTasks";
import { createContext, FC, PropsWithChildren } from "react";

const AppContext = createContext<AppContextInterface>({
  user: undefined,
  list_tasks: [],
});

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: { list_tasks = [], id = "", name = "" } = {} } = useGetTasks();

  return (
    <AppContext.Provider
      value={{ list_tasks, user: { id, name, list_tasks: [] } }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
