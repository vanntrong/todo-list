import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";
import { Task } from "@/modules/home/interfaces/task.interface";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      error: "Missing id",
    });
  }
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), "mocks");
  //Read the json data file data.json
  const fileContents = await fs.readFile(
    jsonDirectory + "/user-task.json",
    "utf8"
  );

  const data = JSON.parse(fileContents);
  data.users[0].tasks = data.users[0].tasks.filter((t: Task) => {
    if (t.id === id) {
      return false;
    }
    return true;
  });

  fs.writeFile(jsonDirectory + "/user-task.json", JSON.stringify(data));

  return res.status(200).json({
    id,
  });
}
