import path from "path";
import { promises as fs } from "fs";

export const loadDataFromFile = async <T>(fileName: string): Promise<T> => {
  const jsonDirectory = path.join(process.cwd(), "mocks");
  const fileContents = await fs.readFile(jsonDirectory + "/" + fileName);
  const data = JSON.parse(fileContents.toString());
  return data;
};

export const saveDataToFile = async <T>(fileName: string, data: T) => {
  const jsonDirectory = path.join(process.cwd(), "mocks");
  fs.writeFile(jsonDirectory + "/" + fileName, JSON.stringify(data));
};

export const TaskTagComponent = {
  Important: "๐จ",
  Personal: "๐จโ๐ฉโ๐งโ๐ฆ",
  Work: "๐ข",
  Shopping: "๐",
  Travel: "โ๏ธ",
  Health: "๐ฅ",
  Home: "๐ ",
  Finance: "๐ฐ",
  Other: "๐",
};

export enum TaskTag {
  Important = "Important",
  Personal = "Personal",
  Work = "Work",
  Shopping = "Shopping",
  Travel = "Travel",
  Health = "Health",
  Home = "Home",
  Finance = "Finance",
  Other = "Other",
}

export const renderTaskTag = (tag: TaskTag) => {
  return (TaskTagComponent[tag] || TaskTagComponent.Other) + " " + tag;
};
