import { useCallback } from "react";
import useSWR, { mutate } from "swr";
import api from "../config/swr";

export const useBuilder = () => {
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

export const useSinglePage = (title) => {
  const pathName = `/builder/${title}`;
  const { data = [], error } = useSWR(pathName);

  const onEdit = useCallback(async (data) => {
    try {
      const { data: res } = api.put(pathName, data);
      if (res) {
        mutate(pathName);
      } else {
        console.log(error);
      }
    } catch (err) {
      throw new Error(err);
    }
  });

  return { data, onEdit };
};
