import { useCallback } from "react";
import useSWR, { mutate } from "swr";
import api from "../config/swr";

const useBuilder = () => {
  const pathName = "/builder";
  const { data = [], error } = useSWR(pathName);

  const onAdd = useCallback(async (data) => {
    try {
      const { data: res } = api.post(pathName, data);
      if (res) {
        mutate(pathName);
      } else {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  });

  return {
    data,
    error,
    onAdd,
  };
};

export default useBuilder;
