export interface ResponseType<T> {
  data: T;
}

export type TokenResponse = {
  access_token: string;
  refresh_token: string;
  exp: number | string;
};
