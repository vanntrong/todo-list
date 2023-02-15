import { WithoutId } from "@/interfaces";
import { renderTaskTag } from "@/utils/helper";
import { EditOutlined, RestOutlined } from "@ant-design/icons";
import { Button, Checkbox, Popconfirm, Typography } from "antd";
import { FC, useState } from "react";
import { ITask } from "../../interfaces/task.interface";
import useDeleteTask from "../../services/useDeleteTask";
import useUpdateTask from "../../services/useUpdateTask";
import AddTask from "../add-task";
import styles from "./task.module.css";

const { Title, Text } = Typography;

interface TaskProps {
  task: ITask;
}

const Task: FC<TaskProps> = ({ task }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();

  return (
    <>
      {!isEditing ? (
        <div className="flex items-center w-full cursor-pointer group min-h-[25px]">
          <Checkbox
            checked={task.completed}
            onChange={(e) =>
              updateTask({ ...task, completed: e.target.checked })
            }
            className={styles["ant-checkbox-wrapper"]}
          />
          <div className="ml-2 flex flex-col">
            <Title
              level={5}
              delete={task.completed}
              className={styles["task-title"]}
            >
              {task.title}
            </Title>
            {task.description && (
              <Text ellipsis={true} className={styles["task-description"]}>
                {task.description}
              </Text>
            )}
            {task.tag && (
              <Text className={styles["task-tag"]}>
                {renderTaskTag(task.tag)}
              </Text>
            )}
          </div>
          <div className="ml-auto items-center gap-x-3 hidden group-hover:flex">
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => setIsEditing(true)}
            ></Button>

            <Popconfirm
              placement="topLeft"
              title={"Are you sure to delete this task?"}
              description={"Delete the task"}
              onConfirm={() =>
                deleteTask({ id: task._id, list_id: task.list_id })
              }
              okText="Yes"
              cancelText="No"
              okButtonProps={{
                className: styles["popconfirm-ok-button"],
              }}
            >
              <Button icon={<RestOutlined />} type="text" size="small"></Button>
            </Popconfirm>
          </div>
        </div>
      ) : (
        <AddTask
          onClose={() => setIsEditing(false)}
          isEditing
          task={task}
          onConfirm={(data: WithoutId<ITask>) => {
            updateTask({ ...data, _id: task._id, list_id: task.list_id });
            setIsEditing(false);
          }}
        />
      )}
    </>
  );
};

export default Task;
