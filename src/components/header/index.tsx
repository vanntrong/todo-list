import { AppContext } from "@/contexts/app";
import AddTask from "@/modules/home/components/add-task";
import useCreateTask from "@/modules/home/services/useCreateTask";
import { MenuOutlined } from "@ant-design/icons";
import { HomeOutlined, PlusOutlined } from "@ant-design/icons/lib/icons";
import { Avatar, Modal, Space } from "antd";
import { FC, useContext, useState } from "react";
import Button from "../button";

interface IHeaderProps {
  onToggleSidebar: () => void;
}

const Header: FC<IHeaderProps> = ({ onToggleSidebar }) => {
  const [isAddTaskVisible, setIsAddTaskVisible] = useState<boolean>(false);
  const { user } = useContext(AppContext);

  const { mutate: createTask } = useCreateTask();

  return (
    <header className="px-3 py-1 bg-red-500 flex items-center justify-between">
      <Space>
        <Button
          icon={<MenuOutlined style={{ fontSize: 18, color: "white" }} />}
          type="text"
          onClick={onToggleSidebar}
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
          onConfirm={(data) => createTask({ ...data, listId: "list-001" })}
        />
      </Modal>
    </header>
  );
};

export default Header;
