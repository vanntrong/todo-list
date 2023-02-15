import { IListTask } from "@/modules/home/interfaces/task.interface";

export interface ISEO {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  site_name?: string;
  locale?: string;
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
  };
  facebook?: {
    app_id?: string;
  };
}

export interface IUser {
  _id: string;
  email: string;
  avatar: string;
  created_at: string;
  full_name: string;
  // list_tasks: IListTask[];
}

export type WithoutId<T> = { [K in Exclude<keyof T, "id">]?: T[K] } & {};
