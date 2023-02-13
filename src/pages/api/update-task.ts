import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";
import { Task } from "@/modules/home/interfaces/task.interface";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title = "Untitled", description, completed = false } = req.body;
  if (!req.body.id) {
    return res.status(400).json({
      error: "Missing id",
    });
  }

  const task = {
    title: title,
    description: description,
    completed: completed,
    id: req.body.id,
  };

  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), "mocks");
  //Read the json data file data.json
  const fileContents = await fs.readFile(
    jsonDirectory + "/user-task.json",
    "utf8"
  );

  const data = JSON.parse(fileContents);
  data.users[0].tasks = data.users[0].tasks.map((t: Task) => {
    if (t.id === task.id) {
      return task;
    }
    return t;
  });

  fs.writeFile(jsonDirectory + "/user-task.json", JSON.stringify(data));

  res.status(200).json(task);
}
