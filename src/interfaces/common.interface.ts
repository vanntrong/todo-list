export interface SEO {
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

export interface User {
  id: string;
  name: string;
}

export type WithoutId<T> = { [K in Exclude<keyof T, "id">]?: T[K] } & {};
