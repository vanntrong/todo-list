import { AppContext } from "@/contexts/app";
import DefaultLayout from "@/layouts/default/default.layout";
import UpcomingListTask from "@/modules/upcoming/components/upcoming-list-task";
import { useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";

const Upcoming = () => {
  const { list_tasks } = useContext(AppContext);

  return (
    <DefaultLayout>
      <div className="w-full pt-10 pl-5">
        <div className="flex gap-10">
          <DragDropContext
            onDragEnd={(res) => {
              console.log({ res });
            }}
          >
            {list_tasks.map((list) => (
              <UpcomingListTask key={list.id} list={list} />
            ))}
          </DragDropContext>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Upcoming;
