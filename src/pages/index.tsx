import Button from "@/components/button";
import { AppContext } from "@/contexts/app";
import DefaultLayout from "@/layouts/default/default.layout";
import AddTask from "@/modules/home/components/add-task";
import ButtonAddTask from "@/modules/home/components/button-add-task";
import ListTaskVertical from "@/modules/home/components/list-task-vertical";
import useCreateTask from "@/modules/home/services/useCreateTask";
import useUpdateOrderTask from "@/modules/home/services/useUpdateOrderTask";
import styles from "@/modules/home/styles/home.module.css";
import { PlusOutlined } from "@ant-design/icons";
import { Space, Typography } from "antd";
import { useCallback, useContext, useState } from "react";
import {
  DragDropContext,
  DropResult,
  resetServerContext,
} from "react-beautiful-dnd";

const VERTICAL_LIST = "VERTICAL_LIST";
export default function Home() {
  const [isAddTaskVisible, setIsAddTaskVisible] = useState<boolean>(false);
  const { list_tasks } = useContext(AppContext);

  const { mutate: createTask } = useCreateTask();
  const { mutate: updateOrderTask } = useUpdateOrderTask();

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;
      updateOrderTask({
        sourceId: result.source.droppableId,
        sourceIndex: result.source.index,
        destinationId: result.destination?.droppableId,
        destinationIndex: result.destination?.index,
      });
    },
    [updateOrderTask]
  );

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
            {!!list_tasks.length && (
              <DragDropContext onDragEnd={handleDragEnd}>
                <ListTaskVertical
                  id={list_tasks[0]._id || VERTICAL_LIST}
                  tasks={list_tasks[0].tasks || []}
                />
              </DragDropContext>
            )}
            {!isAddTaskVisible && !!list_tasks.length ? (
              <ButtonAddTask onClick={() => setIsAddTaskVisible(true)} />
            ) : (
              <AddTask
                onClose={() => setIsAddTaskVisible(false)}
                onConfirm={(data) =>
                  createTask({
                    ...data,
                    list_id: list_tasks[0]._id,
                  })
                }
              />
            )}
          </Space>
        </div>
      </div>
    </DefaultLayout>
  );
}

export const getServerSideProps = async () => {
  resetServerContext();

  return {
    props: {},
  };
};
