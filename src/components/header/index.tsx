import { AppContext } from "@/contexts/app";
import AddTask from "@/modules/home/components/add-task";
import useCreateTask from "@/modules/home/services/useCreateTask";
import { MenuOutlined } from "@ant-design/icons";
import { HomeOutlined, PlusOutlined } from "@ant-design/icons/lib/icons";
import { Avatar, Modal, Space } from "antd";
import { useRouter } from "next/router";
import { FC, useContext, useState } from "react";
import Button from "../button";

interface IHeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: FC<IHeaderProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const [isAddTaskVisible, setIsAddTaskVisible] = useState<boolean>(false);
  const { user, list_tasks } = useContext(AppContext);
  const router = useRouter();

  const { mutate: createTask } = useCreateTask();

  return (
    <header className="px-3 py-1 bg-red-500 flex items-center justify-between">
      <Space>
        <Button
          icon={<MenuOutlined style={{ fontSize: 18, color: "white" }} />}
          type="text"
          onClick={onToggleSidebar}
          title={`${isSidebarOpen ? "Close" : "Open"} sidebar`}
        />
        <Button
          icon={<HomeOutlined style={{ fontSize: 18, color: "white" }} />}
          type="text"
          onClick={() => router.push("/")}
          title="Go to home"
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
          <Avatar>{user?.full_name.charAt(0)}</Avatar>
        </Button>
      </Space>
      <Modal open={isAddTaskVisible} footer={false} closable={false}>
        <AddTask
          onClose={() => setIsAddTaskVisible(false)}
          onConfirm={(data) =>
            createTask({ ...data, list_id: list_tasks[0]._id })
          }
        />
      </Modal>
    </header>
  );
};

export default Header;
