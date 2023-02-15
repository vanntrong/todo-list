import { IUser } from "@/interfaces";
import { loadDataFromFile, saveDataToFile } from "@/utils/helper";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    title = "Untitled",
    description,
    completed = false,
    listId,
  } = req.body;
  if (!listId) return res.status(400).json({ message: "List id is required" });

  const task = {
    title: title,
    description: description,
    completed: completed,
    id: new Date().getTime().toString(),
    listId,
  };
  const data = await loadDataFromFile<{ users: IUser[] }>("user-task.json");
  data.users[0].list_tasks = data.users[0].list_tasks.map((list) =>
    list.id === listId ? { ...list, tasks: [...list.tasks, task] } : list
  );

  saveDataToFile("user-task.json", data);

  res.status(201).json(task);
}
