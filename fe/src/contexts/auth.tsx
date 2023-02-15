import { pageRoutes } from "@/configs/navigations";
import { getCookie } from "@/utils";
import { useRouter } from "next/router";
import { createContext, FC, PropsWithChildren, useContext } from "react";
import { AppContext } from "./app";

/**
 * Check the route is the authenticated route or not?
 * @param {string} pathName - The URL path name (e.g. /dashboard/users)
 */

const isAuthenticatedRoute = (pathName: string): boolean => {
  const routes = Object.values(pageRoutes);
  const route = routes.find((item) => item.pathname === pathName);
  return !!route?.isAuthenticated;
};

/**
 * Create Auth Context
 */
export const AuthContext = createContext({});

/**
 * Auth Provider
 */
export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const accessToken = getCookie("access_token");
  const { user } = useContext(AppContext);

  if (typeof window === "undefined") return children as JSX.Element;

  const renderContent = () => {
    const isLoginRoute = router.pathname === pageRoutes.signIn.pathname;
    if (isLoginRoute && accessToken && user) {
      router.push(pageRoutes.home.pathname);
      return null;
    } else if (!isLoginRoute) {
      if (isAuthenticatedRoute(router.pathname) && (!accessToken || !user)) {
        router.push(pageRoutes.signIn.pathname);
        return null;
      }
    }

    return children;
  };

  return (
    <AuthContext.Provider value={{}}>{renderContent()}</AuthContext.Provider>
  );
};
