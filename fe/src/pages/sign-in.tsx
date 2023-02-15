import Button from "@/components/button";
import { useLogin } from "@/modules/auth/services/useLogin";
import React from "react";

const SignIn = () => {
  const { mutate: login } = useLogin();

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Button onClick={() => login()}>Login</Button>
    </div>
  );
};

export default SignIn;
