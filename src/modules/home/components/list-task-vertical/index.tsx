import MultipleListTask from "@/modules/upcoming/components/task";
import clsx from "clsx";
import React, { FC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { ITask } from "../../interfaces/task.interface";
import { Typography } from "antd";

import styles from "./list-task-vertical.module.css";
import Task from "../task";

interface Props {
  id: string;
  tasks?: ITask[];
  title?: string;
  isMultipleList?: boolean;
}

const { Title } = Typography;

const ListTaskVertical: FC<Props> = ({
  id,
  tasks = [],
  title,
  isMultipleList,
}) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={clsx("flex flex-col gap-3")}
        >
          {title && (
            <Title level={1} className={styles["list-title"]}>
              {title}
            </Title>
          )}
          {tasks.map((task, index) => (
            <Draggable key={task._id} draggableId={task._id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={clsx("min-h-[45px]", {
                    "shadow-xl bg-white": snapshot.isDragging,
                  })}
                >
                  {isMultipleList ? (
                    <MultipleListTask task={task} />
                  ) : (
                    <Task task={task} />
                  )}
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
