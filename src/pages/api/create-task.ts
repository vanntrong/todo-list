import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title = "Untitled", description, completed = false } = req.body;
  const task = {
    title: title,
    description: description,
    completed: completed,
    id: new Date().getTime().toString(),
  };
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), "mocks");
  //Read the json data file data.json
  const fileContents = await fs.readFile(
    jsonDirectory + "/user-task.json",
    "utf8"
  );

  const data = JSON.parse(fileContents);
  data.users[0].tasks.push(task);

  fs.writeFile(jsonDirectory + "/user-task.json", JSON.stringify(data));

  res.status(201).json(task);
}
