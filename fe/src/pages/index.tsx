import Button from "@/components/button";
import { AppContext } from "@/contexts/app";
import DefaultLayout from "@/layouts/default/default.layout";
import ModalAddList from "@/modules/home/components/modal-add-list";
import useCreateList from "@/modules/home/services/useCreateList";
import useUpdateOrderTask from "@/modules/home/services/useUpdateOrderTask";
import UpcomingListTask from "@/modules/upcoming/components/upcoming-list-task";
import { PlusOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useContext, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const Home = () => {
  const { list_tasks } = useContext(AppContext);
  const { mutate: updateOrderTask } = useUpdateOrderTask();
  const { mutate: createList } = useCreateList();

  const [isAddListVisible, setIsAddListVisible] = useState(false);

  const handleDragEnd = (res: DropResult) => {
    if (!res.destination) return;

    updateOrderTask({
      sourceId: res.source.droppableId,
      sourceIndex: res.source.index,
      destinationId: res.destination.droppableId,
      destinationIndex: res.destination.index,
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
          <ModalAddList
            visible={isAddListVisible}
            onCancel={() => setIsAddListVisible(false)}
            onConfirm={(data) => {
              createList(data);
              setIsAddListVisible(false);
            }}
          />

          {!isAddListVisible && (
            <Button
              icon={
                <PlusOutlined className="group-hover:text-red-500 text-gray-900" />
              }
              onClick={() => setIsAddListVisible(true)}
            >
              <Typography.Text className="group-hover:text-red-500 text-gray-900">
                Add list
              </Typography.Text>
            </Button>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Home;
