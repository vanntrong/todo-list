import Button from "@/components/button";
import { WithoutId } from "@/interfaces";
import { renderTaskTag, TaskTag } from "@/utils/helper";
import { isStringEmpty } from "@/utils/validate";
import { Input, Select, Space } from "antd";
import clsx from "clsx";
import React, { FC, useEffect, useState } from "react";
import { ITask } from "../../interfaces/task.interface";
import styles from "./add-task.module.css";

export interface AddTaskProps {
  onClose?: () => void;
  isEditing?: boolean;
  task?: ITask;
  onConfirm: (task: WithoutId<ITask> | ITask) => void;
}

const TagOptions = Object.values(TaskTag).map((tag) => ({
  value: tag,
  label: renderTaskTag(tag),
}));

const AddTask: FC<AddTaskProps> = ({
  onClose,
  isEditing,
  task: _task = {
    title: "",
    description: undefined,
    completed: false,
    tag: TaskTag.Important,
  },
  onConfirm,
}) => {
  const [task, setTask] = useState<WithoutId<ITask>>(_task);
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

  const handleTagChange = (value: TaskTag) => {
    setTask((prevState) => ({
      ...prevState,
      tag: value,
    }));
  };

  const resetValue = () => {
    setTask({
      title: "",
      description: undefined,
      completed: false,
      tag: TaskTag.Important,
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
        <Select
          options={TagOptions}
          onChange={handleTagChange}
          className={styles["add-task-select"]}
          size="small"
          placeholder="Tag"
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
