import { useCallback } from "react";
import useSWR, { mutate } from "swr";
import api from "../config/swr";

export const useMediaLibraries = () => {
  const pathName = "/media";
  const { data = [], error } = useSWR(pathName);

  const onAdd = useCallback(async (data) => {
    // TODO : Integrate with API system for upload file
    try {
      const { data: res } = api.post(pathName, data);
      if (res) {
        mutate(pathName);
      } else {
        console.log(error);
      }
    } catch (error) {
      throw new Error(error);
    }
  });

  return { data, error, onAdd };
};
