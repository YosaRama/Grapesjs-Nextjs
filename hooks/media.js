import useSWR, { mutate } from "swr";
import axios from "axios";
import { useCallback, useState } from "react";
import api from "../config/swr";
import { message } from "antd";
import { useRouter } from "next/router";
import serialize from "../config/serialize";

export const useMediaLibraries = () => {
  const router = useRouter();
  const queryString = serialize(router.query);
  const pathName = "/media?";
  const pathKeys = pathName + queryString;
  const [loading, setLoading] = useState(false);
  const { data, error } = useSWR(pathKeys);
  const [status, setStatus] = useState("");

  const onAdd = useCallback(
    async ({ file }) => {
      const fmData = new FormData();
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };

      fmData.append("theFiles", file);
      try {
        setLoading(true);
        const res = await axios.post("/api/media/upload", fmData, config);
        if (res) {
          mutate(pathName);
          setStatus(res.status);
        } else {
          console.log(error);
        }
      } catch (err) {
        throw new Error(err);
      } finally {
        setLoading(false);
      }
    },
    [pathName]
  );

  const onDelete = useCallback(
    async (Id, Url) => {
      try {
        setLoading(true);
        const { data: res } = await api.delete(pathName, {
          data: { id: Id, url: Url },
        });
        if (res) {
          mutate(pathName);
        } else {
          console.log(error);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    },
    [pathName]
  );

  const onUpdate = useCallback(
    async (data) => {
      try {
        setLoading(true);
        const { data: res } = await api.put(pathName, data);
        if (res) {
          mutate(pathName);
          message.success("Success edit data");
        } else {
          console.log(error);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    },
    [pathName]
  );

  return {
    data,
    onAdd,
    onDelete,
    onUpdate,
    loading: (!error && !data) || loading,
    status,
  };
};
