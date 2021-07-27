import useSWR, { mutate } from "swr";
import axios from "axios";
import { useCallback, useState } from "react";
import api from "../config/swr";
import { message } from "antd";
import Resizer from "react-image-file-resizer";

export const useMediaLibraries = () => {
  const pathName = "/media";
  const [loading, setLoading] = useState(false);
  const { data, error } = useSWR(pathName);
  const [status, setStatus] = useState("");

  //* upload with client side
  // const onAdd = useCallback(
  //   async ({ file }) => {
  //     const fmData = new FormData();
  //     const thumbData = new FormData();
  //     const config = {
  //       headers: { "content-type": "multipart/form-data" },
  //     };

  //     const smallResizeFile = (filePath) =>
  //       new Promise((resolve) => {
  //         Resizer.imageFileResizer(
  //           filePath,
  //           150,
  //           50,
  //           "JPEG",
  //           100,
  //           0,
  //           (uri) => {
  //             resolve(uri);
  //           },
  //           "file"
  //         );
  //       });

  //     const mediumResizeFile = (filePath) =>
  //       new Promise((resolve) => {
  //         Resizer.imageFileResizer(
  //           filePath,
  //           720,
  //           348,
  //           "JPEG",
  //           100,
  //           0,
  //           (uri) => {
  //             resolve(uri);
  //           },
  //           "file"
  //         );
  //       });

  //     const LargeResizeFile = (filePath) =>
  //       new Promise((resolve) => {
  //         Resizer.imageFileResizer(
  //           filePath,
  //           1920,
  //           1200,
  //           "JPEG",
  //           100,
  //           0,
  //           (uri) => {
  //             resolve(uri);
  //             console.log(resolve(uri));
  //           },
  //           "file"
  //         );
  //       });

  //     if (file.type === "image/jpeg") {
  //       const smallImage = await smallResizeFile(file);
  //       const mediumImage = await mediumResizeFile(file);
  //       const LargeImage = await LargeResizeFile(file);

  //       thumbData.append("theFiles", smallImage, "150px@" + file.name);
  //       thumbData.append("theFiles", mediumImage, "720px@" + file.name);
  //       thumbData.append("theFiles", LargeImage, "1920px@" + file.name);
  //     }

  //     fmData.append("theFiles", file);

  //     try {
  //       setLoading(true);
  //       const res = await axios.post("/api/media/upload", fmData, config);
  //       if (res) {
  //         const thumbRes = await axios.post(
  //           "/api/media/upload",
  //           thumbData,
  //           config
  //         );
  //         mutate(pathName);
  //         setStatus(res.status);
  //       } else {
  //         console.log(error);
  //       }
  //     } catch (err) {
  //       throw new Error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   [pathName]
  // );

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
