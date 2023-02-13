import { Button as AntButton } from "antd";
import { ButtonProps } from "antd/es/button/button";
import { FC } from "react";

const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <AntButton
      {...props}
      className={`flex items-center justify-center ${className}`}
    >
      {children}
    </AntButton>
  );
};

export default Button;
