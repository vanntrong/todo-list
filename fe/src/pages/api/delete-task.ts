import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";
import { ITask } from "@/modules/home/interfaces/task.interface";
import { loadDataFromFile, saveDataToFile } from "@/utils/helper";
import { IUser } from "@/interfaces";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, listId } = req.query;

  if (!id || !listId) {
    return res.status(400).json({
      error: "Missing id",
    });
  }
  const data = await loadDataFromFile<{ users: IUser[] }>("user-task.json");
  data.users[0].list_tasks = data.users[0].list_tasks.map((l) => {
    if (l.id === listId) {
      l.tasks = l.tasks.filter((t) => {
        return t.id !== id;
      });
    }

    return l;
  });

  saveDataToFile("user-task.json", data);

  return res.status(200).json({
    id,
    listId,
  });
}
