import { WithoutId } from "@/interfaces";
import { EditOutlined, RestOutlined } from "@ant-design/icons";
import { Button, Checkbox, Popconfirm, Typography } from "antd";
import { FC, useState } from "react";
import { Task } from "../../interfaces/task.interface";
import useDeleteTask from "../../services/useDeleteTask";
import useUpdateTask from "../../services/useUpdateTask";
import AddTask from "../add-task";

const { Title, Text } = Typography;

interface TaskProps {
  task: Task;
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
          />
          <div className="ml-2">
            <Title
              level={5}
              style={{ marginBottom: 0, fontSize: 15, fontWeight: 400 }}
              delete={task.completed}
            >
              {task.title}
            </Title>
            {task.description && (
              <Text ellipsis={true} style={{ width: 300, fontSize: 12 }}>
                {task.description}
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
              onConfirm={() => deleteTask(task.id)}
              okText="Yes"
              cancelText="No"
              okButtonProps={{
                style: { backgroundColor: "#ff4d4f", borderColor: "#ff4d4f" },
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
          onConfirm={(data: WithoutId<Task>) => {
            updateTask({ ...data, id: task.id });
          }}
        />
      )}
    </>
  );
};

export default Task;
