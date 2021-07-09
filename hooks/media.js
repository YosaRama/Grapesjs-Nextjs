import useSWR, { mutate } from "swr";

export const useMediaLibraries = () => {
  const pathName = "/media";
  const { data = [], error } = useSWR(pathName);

  return { data, error };
};
