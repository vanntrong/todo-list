import { AppContext } from "@/contexts/app";
import DefaultLayout from "@/layouts/default/default.layout";
import ListTaskVertical from "@/modules/home/components/list-task-vertical";
import React, { useContext } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Upcoming = () => {
  const { list_tasks } = useContext(AppContext);
  return (
    <DefaultLayout>
      <div className="w-full pt-10 pl-5">
        <h1>Hello</h1>
        <div className="flex">
          <DragDropContext
            onDragEnd={(res) => {
              console.log({ res });
            }}
          >
            {list_tasks.map((list) => (
              <ListTaskVertical key={list.id} id={list.id} tasks={list.tasks} />
            ))}
          </DragDropContext>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Upcoming;
