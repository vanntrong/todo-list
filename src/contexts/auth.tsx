import { pageRoutes } from "@/configs/navigations";
import { BASE_URL } from "@/constants";
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
  const user = useContext(AppContext);
  const accessToken = getCookie("token");

  if (typeof window === "undefined") return children as JSX.Element;

  const renderContent = (backToLogin = false) => {
    // Get path name & query params
    const locationHref = window?.location?.href;
    const pathName = window?.location?.pathname;
    const params = new URLSearchParams(window?.location?.search);
    const redirectURL = params.get("next");
    // Is Login route
    const isLoginRoute = pathName === pageRoutes.signIn.pathname;
    // Handle the redirection on the login page / another page
    if (isLoginRoute) {
      if (user && accessToken) {
        window.location.href =
          redirectURL || BASE_URL + pageRoutes.home.pathname;
      }
    } else if (!user) {
      if (isAuthenticatedRoute(pathName) || backToLogin) {
        router
          .push({
            pathname: pageRoutes.signIn.pathname,
            query: {
              next: locationHref,
            },
          })
          .catch(() => "");
        return "";
      }
    }
    return children;
  };

  return (
    <AuthContext.Provider value={{}}>{renderContent()}</AuthContext.Provider>
  );
};
