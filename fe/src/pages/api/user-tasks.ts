import { IUser } from "@/interfaces";
import { loadDataFromFile } from "@/utils/helper";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await loadDataFromFile<{ users: IUser[] }>("user-task.json");
  res.status(200).json(data.users[0]);
}
