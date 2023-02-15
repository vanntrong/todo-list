import React, { FC } from "react";
import { Typography } from "antd";

import styles from "./task.module.css";
import { ITask } from "@/modules/home/interfaces/task.interface";
import { renderTaskTag } from "@/utils/helper";

const { Title, Text } = Typography;

interface ITaskProps {
  task: ITask;
}

const Task: FC<ITaskProps> = ({ task }) => {
  return (
    <div className="bg-white p-3 rounded-lg w-[250px] hover:shadow-md border border-gray-200 transition-all min-h-[70px] flex flex-col">
      <Title level={5} className={styles["task-title"]}>
        {task.title}
      </Title>
      {task.description && (
        <Text ellipsis={true} className={styles["task-description"]}>
          {task.description}
        </Text>
      )}
      {task.tag && (
        <Text className={styles["task-tag"]}>{renderTaskTag(task.tag)}</Text>
      )}
    </div>
  );
};

export default Task;
