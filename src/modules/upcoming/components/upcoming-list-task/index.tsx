import AddTask from "@/modules/home/components/add-task";
import ButtonAddTask from "@/modules/home/components/button-add-task";
import ListTaskVertical from "@/modules/home/components/list-task-vertical";
import { IListTask } from "@/modules/home/interfaces/task.interface";
import React, { FC, useState } from "react";

interface IUpcomingListTaskProps {
  list: IListTask;
}

const UpcomingListTask: FC<IUpcomingListTaskProps> = ({ list }) => {
  const [isAddTaskVisible, setIsAddTaskVisible] = useState(false);

  return (
    <div>
      <ListTaskVertical
        id={list.id}
        tasks={list.tasks}
        title={list.title}
        isMultipleList
      />
      {isAddTaskVisible ? (
        <div className="mt-3 w-[250px]">
          <AddTask
            onConfirm={(task) => {}}
            onClose={() => setIsAddTaskVisible(false)}
          />
        </div>
      ) : (
        <ButtonAddTask onClick={() => setIsAddTaskVisible(true)} />
      )}
    </div>
  );
};

export default UpcomingListTask;
