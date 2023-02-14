import clsx from "clsx";
import React, { FC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ITask } from "../../interfaces/task.interface";
import Task from "../task";

interface Props {
  id: string;
  tasks?: ITask[];
}

const ListTaskVertical: FC<Props> = ({ id, tasks = [] }) => {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={clsx("flex flex-col gap-3", {})}
        >
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={clsx("h-[45px]", {
                    "shadow-xl bg-white": snapshot.isDragging,
                  })}
                >
                  <Task task={task} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default ListTaskVertical;
