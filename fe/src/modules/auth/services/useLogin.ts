import { AppContext } from "@/contexts/app";
import { IUser } from "@/interfaces";
import { setCookie } from "@/utils";
import request from "@/utils/request";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

export const USE_LOGIN_KEY = "useLogin";

export interface LoginResponse extends IUser {
  tokens: {
    access_token: string;
    refresh_token: string;
    exp: string | number;
  };
}

export const useLogin = () => {
  const { changeUser } = useContext(AppContext);
  const router = useRouter();

  return useMutation(
    [USE_LOGIN_KEY],
    async () => {
      return request.post<void, LoginResponse>("/auth/login", {
        email: "trong@gmail.com",
        password: "123456",
      });
    },
    {
      onSuccess(data) {
        const { tokens, ...user } = data;
        changeUser(user);
        const redirect = router.query.next;
        router.push(redirect ? (redirect as string) : "/");
        setCookie("access_token", tokens.access_token, 650000);
      },
    }
  );
};
