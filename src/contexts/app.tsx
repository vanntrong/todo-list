import { IUser } from "@/interfaces";
import { AppContextInterface } from "@/interfaces/app-context.interface";
import useGetTasks from "@/modules/home/services/useGetTasks";
import { createContext, FC, PropsWithChildren, useState } from "react";

const AppContext = createContext<AppContextInterface>({
  list_tasks: [],
  user: undefined,
  changeUser: () => {},
});

export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser>();
  const { data = [] } = useGetTasks();

  const changeUser = (user: IUser) => {
    setUser(user);
  };
  return (
    <AppContext.Provider value={{ list_tasks: data, user, changeUser }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
