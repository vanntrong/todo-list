import { AppContext } from "@/contexts/app";
import AddTask from "@/modules/home/components/add-task";
import useCreateTask from "@/modules/home/services/useCreateTask";
import { MenuOutlined } from "@ant-design/icons";
import { HomeOutlined, PlusOutlined } from "@ant-design/icons/lib/icons";
import { Avatar, Modal, Space } from "antd";
import { useContext, useEffect, useState } from "react";
import Button from "../button";

const Header = () => {
  const [isAddTaskVisible, setIsAddTaskVisible] = useState<boolean>(false);
  const { user, setTasks } = useContext(AppContext);

  const { data, mutate: createTask } = useCreateTask();

  useEffect(() => {
    if (data) {
      setTasks?.((prev) => [...prev, data]);
      setIsAddTaskVisible(false);
    }
  }, [data, setTasks]);

  return (
    <header className="px-3 py-1 bg-red-500 flex items-center justify-between">
      <Space>
        <Button
          icon={<MenuOutlined style={{ fontSize: 18, color: "white" }} />}
          type="text"
        />
        <Button
          icon={<HomeOutlined style={{ fontSize: 18, color: "white" }} />}
          type="text"
        />
      </Space>
      <Space size={"middle"}>
        <Button
          type="text"
          icon={
            <PlusOutlined
              style={{ fontSize: 18, color: "white" }}
              onClick={() => setIsAddTaskVisible(true)}
            />
          }
        />
        <Button shape="circle" className="flex items-center">
          <Avatar>{user?.name.charAt(0)}</Avatar>
        </Button>
      </Space>
      <Modal open={isAddTaskVisible} footer={false} closable={false}>
        <AddTask
          onClose={() => setIsAddTaskVisible(false)}
          onConfirm={(data) => createTask(data)}
        />
      </Modal>
    </header>
  );
};

export default Header;
