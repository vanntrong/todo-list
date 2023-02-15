export const isStringEmpty = (value: string | undefined | null) => {
  return value !== undefined && value !== null && value !== "";
};
