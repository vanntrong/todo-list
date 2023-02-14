import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";
import { IListTask, ITask } from "@/modules/home/interfaces/task.interface";
import { loadDataFromFile, saveDataToFile } from "@/utils/helper";
import { IUser } from "@/interfaces";

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
  if (!req.body.id || !req.body.listId) {
    return res.status(400).json({
      error: "Missing id",
    });
  }

  const task = {
    title: title,
    description: description,
    completed: completed,
    id: req.body.id,
    listId,
  };

  const data = await loadDataFromFile<{ users: IUser[] }>("user-task.json");
  data.users[0].list_tasks = data.users[0].list_tasks.map((l: IListTask) => {
    if (l.id === listId) {
      l.tasks = l.tasks.map((t: ITask) => {
        if (t.id === task.id) {
          return task;
        }
        return t;
      });
    }
    return l;
  });

  saveDataToFile("user-task.json", data);

  res.status(200).json(task);
}
