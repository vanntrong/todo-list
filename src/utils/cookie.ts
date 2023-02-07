import Cookies from "js-cookie";

export const setCookie = (name: string, value: string, expiredIn: number) => {
  Cookies.set(name, value, { expires: expiredIn });
};

export const getCookie = (name: string) => {
  return Cookies.get(name);
};
