import Button from "@/components/button";
import { AppContext } from "@/contexts/app";
import DefaultLayout from "@/layouts/default/default.layout";
import useUpdateOrderTask from "@/modules/home/services/useUpdateOrderTask";
import UpcomingListTask from "@/modules/upcoming/components/upcoming-list-task";
import { PlusOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useContext } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const Upcoming = () => {
  const { list_tasks } = useContext(AppContext);
  const { mutate: updateOrderTask } = useUpdateOrderTask();

  const handleDragEnd = (res: DropResult) => {
    if (!res.destination) return;

    updateOrderTask({
      sourceId: res.source.droppableId,
      sourceIndex: res.source.index,
      destinationId: res.destination?.droppableId,
      destinationIndex: res.destination?.index,
    });
  };

  return (
    <DefaultLayout>
      <div className="w-full pt-10 pl-5">
        <div className="flex gap-10">
          <DragDropContext onDragEnd={handleDragEnd}>
            {list_tasks.map((list) => (
              <UpcomingListTask key={list._id} list={list} />
            ))}
          </DragDropContext>
          <Button
            icon={
              <PlusOutlined className="group-hover:text-red-500 text-gray-900" />
            }
          >
            <Typography.Text className="group-hover:text-red-500 text-gray-900">
              Add list
            </Typography.Text>
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Upcoming;
