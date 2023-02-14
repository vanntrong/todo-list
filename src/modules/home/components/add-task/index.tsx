import Button from "@/components/button";
import { WithoutId } from "@/interfaces";
import { isStringEmpty } from "@/utils/validate";
import { Input, Space } from "antd";
import clsx from "clsx";
import React, { FC, useEffect, useState } from "react";
import { ITask } from "../../interfaces/task.interface";

export interface AddTaskProps {
  onClose?: () => void;
  isEditing?: boolean;
  task?: ITask;
  onConfirm: (task: WithoutId<ITask> | ITask) => void;
}

const AddTask: FC<AddTaskProps> = ({
  onClose,
  isEditing,
  task: _task,
  onConfirm,
}) => {
  const [task, setTask] = useState<WithoutId<ITask>>({
    title: _task?.title || "",
    description: _task?.description,
    completed: _task?.completed || false,
  });
  const [isDisableAddTask, setIsDisableAddTask] = useState<boolean>(true);

  useEffect(() => {
    if (isStringEmpty(task.title)) {
      setIsDisableAddTask(false);
      return;
    }
    setIsDisableAddTask(true);
  }, [task.title, task.description]);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetValue = () => {
    setTask({
      title: "",
      description: "",
    });
  };

  return (
    <div className={clsx("w-full border border-gray-200 rounded-lg py-2")}>
      <div className="px-2">
        <Input
          name="title"
          placeholder="Task name"
          bordered={false}
          value={task.title}
          onChange={handleValueChange}
        />
        <Input
          placeholder="Description"
          bordered={false}
          name="description"
          value={task.description}
          onChange={handleValueChange}
        />
      </div>
      <div className="w-full h-[1px] border border-gray-100"></div>
      <div className="flex items-center justify-end px-2">
        <Space className="mt-2">
          <Button type="text" className="bg-gray-50" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="text"
            className="bg-red-500 text-white disabled:bg-red-100"
            disabled={isDisableAddTask}
            onClick={() => {
              onConfirm(task);
              resetValue();
            }}
          >
            {isEditing ? "Save" : "Add task"}
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default AddTask;
