import { IUser } from "@/interfaces";
import { loadDataFromFile, saveDataToFile } from "@/utils/helper";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sourceId, sourceIndex, destinationId, destinationIndex } = req.body;
  const data = await loadDataFromFile<{ users: IUser[] }>("user-task.json");

  const source = data.users[0].list_tasks.find((task) => task.id === sourceId);
  const destination = data.users[0].list_tasks.find(
    (task) => task.id === destinationId
  );

  if (!source || !destination) {
    return res.status(400).json({ message: "Invalid task id" });
  }

  if (source.id === destination.id) {
    const [removed] = source.tasks.splice(sourceIndex, 1);
    destination.tasks.splice(destinationIndex, 0, removed);
  }

  saveDataToFile("user-task.json", data);

  return res.status(200).json({
    sourceId,
    sourceIndex,
    destinationId,
    destinationIndex,
  });
}
