import Button from "@/components/button";
import { PlusOutlined } from "@ant-design/icons";
import { ButtonProps, Typography } from "antd";
import React, { FC } from "react";

const ButtonAddTask: FC<ButtonProps> = (props) => {
  return (
    <Button
      type="link"
      className="group gap-x-2"
      icon={<PlusOutlined className="group-hover:text-red-500 text-gray-900" />}
      {...props}
    >
      <Typography.Text className="group-hover:text-red-500 text-gray-900">
        Add task
      </Typography.Text>
    </Button>
  );
};

export default ButtonAddTask;
