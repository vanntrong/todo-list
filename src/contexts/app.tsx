import { User } from "@/interfaces";
import { createContext, FC, Provider, useState } from "react";

const AppContext = createContext({});

export const AppProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>();
  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
