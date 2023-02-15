import { isStringEmpty } from "@/utils/validate";
import { Input, Modal } from "antd";
import React, { FC, useEffect, useState } from "react";
import { ICreateListTaskPayload } from "../../services/useCreateList";

interface IModalAddListProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (list: ICreateListTaskPayload) => void;
}

const ModalAddList: FC<IModalAddListProps> = ({
  visible,
  onCancel,
  onConfirm,
}) => {
  const [isDisableAddList, setIsDisableAddList] = useState<boolean>(true);
  const [list, setList] = useState<ICreateListTaskPayload>({
    title: "",
  });

  useEffect(() => {
    if (isStringEmpty(list?.title)) {
      setIsDisableAddList(false);
      return;
    }
    setIsDisableAddList(true);
  }, [list?.title]);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setList((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      closable={false}
      onOk={() => onConfirm(list)}
      okButtonProps={{
        type: "text",
        className: "bg-red-500 text-white disabled:bg-red-100",
        disabled: isDisableAddList,
      }}
      cancelButtonProps={{
        type: "text",
        className: "bg-gray-50",
      }}
    >
      <div className="flex flex-col gap-2">
        <Input placeholder="Title" name="title" onChange={handleValueChange} />
        <Input
          placeholder="Description"
          name="description"
          onChange={handleValueChange}
        />
      </div>
    </Modal>
  );
};

export default ModalAddList;
