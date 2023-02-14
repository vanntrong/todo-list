import Button from "@/components/button";
import { AppContext } from "@/contexts/app";
import DefaultLayout from "@/layouts/default/default.layout";
import AddTask from "@/modules/home/components/add-task";
import Task from "@/modules/home/components/task";
import useCreateTask from "@/modules/home/services/useCreateTask";
import { PlusOutlined } from "@ant-design/icons";
import { Space, Typography } from "antd";
import { useContext, useState } from "react";
import styles from "@/modules/home/styles/home.module.css";

export default function Home() {
  const [isAddTaskVisible, setIsAddTaskVisible] = useState<boolean>(false);
  const { tasks } = useContext(AppContext);

  const { mutate: createTask } = useCreateTask();

  return (
    <DefaultLayout>
      <div className="w-full flex justify-center pt-10">
        <div className="max-w-[600px] w-full">
          <Typography.Title level={1} className={styles["page-title"]}>
            Today{" "}
            <span className="font-normal text-[12px] text-gray-600">
              Mon 14 Feb
            </span>
          </Typography.Title>
          <Space
            direction="vertical"
            size={"large"}
            className={styles["page-space"]}
          >
            {tasks.map((task) => (
              <>
                <div>
                  <Task key={task.id} task={task} />
                  <div className="w-full h-[1px] bg-gray-100 mt-1"></div>
                </div>
              </>
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
