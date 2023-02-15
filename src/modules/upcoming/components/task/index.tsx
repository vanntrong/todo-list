import React, { FC } from "react";
import { Typography } from "antd";

import styles from "./task.module.css";
import { ITask } from "@/modules/home/interfaces/task.interface";

const { Title, Text } = Typography;

interface ITaskProps {
  task: ITask;
}

const Task: FC<ITaskProps> = ({ task }) => {
  return (
    <div className="bg-white p-3 rounded-lg w-[250px] hover:shadow-md border border-gray-200 transition-all min-h-[70px]">
      <Title level={5} className={styles["task-title"]}>
        {task.title}
      </Title>
      {task.description && (
        <Text ellipsis={true} className={styles["task-description"]}>
          {task.description}
        </Text>
      )}
    </div>
  );
};

export default Task;
