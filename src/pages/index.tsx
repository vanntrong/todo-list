import DefaultLayout from "@/layouts/default/default.layout";
import Task from "@/modules/home/components/task";
import { Space, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Button from "@/components/button";
import AddTask from "@/modules/home/components/add-task";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/contexts/app";
import useCreateTask from "@/modules/home/services/useCreateTask";

export default function Home() {
  const [isAddTaskVisible, setIsAddTaskVisible] = useState<boolean>(false);
  const { tasks, setTasks } = useContext(AppContext);

  const { data, mutate: createTask } = useCreateTask();

  useEffect(() => {
    if (data) {
      setTasks?.((prev) => [...prev, data]);
    }
  }, [data, setTasks]);

  return (
    <DefaultLayout>
      <div className="w-full flex justify-center pt-10">
        <div className="max-w-[600px] w-full">
          <Typography.Title
            level={1}
            className="font-bold"
            style={{ fontSize: 20 }}
          >
            Today{" "}
            <span className="font-normal text-[12px] text-gray-600">
              Mon 13 Feb
            </span>
          </Typography.Title>
          <Space direction="vertical" size={"large"} style={{ width: "100%" }}>
            {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
            {!isAddTaskVisible ? (
              <Button
                type="link"
                className="group gap-x-2"
                icon={
                  <PlusOutlined className="group-hover:text-red-500 text-gray-900" />
                }
                onClick={() => setIsAddTaskVisible(true)}
              >
                <Typography.Text className="group-hover:text-red-500 text-gray-900">
                  Add task
                </Typography.Text>
              </Button>
            ) : (
              <AddTask
                onClose={() => setIsAddTaskVisible(false)}
                onConfirm={(data) => createTask(data)}
              />
            )}
          </Space>
        </div>
      </div>
    </DefaultLayout>
  );
}
