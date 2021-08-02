import { useSWRInfinite } from "swr";
import axios from "axios";
import { useCallback, useState } from "react";
import api, { fetcher } from "../config/swr";
import { message } from "antd";

export const useMediaLibraries = () => {
  const pathName = "/media?";
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);

  const { data, size, setSize, error, isValidating, mutate } = useSWRInfinite(
    (index) => `/media?page=${index}`
  );

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

  const onAdd = useCallback(async ({ file }) => {
    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    fmData.append("theFiles", file);
    try {
      setLoading(true);
      const res = await axios.post("/api/media/upload", fmData, config);
      if (res) {
        mutate();
      } else {
        console.log(error);
      }
    } catch (err) {
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const onDelete = useCallback(
    async (Id, Url) => {
      try {
        setLoading(true);
        const { data: res } = await api.delete(pathName, {
          data: { id: Id, url: Url },
        });
        if (res) {
          mutate();
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
      setStatus("uploading");
      try {
        setLoading(true);
        const { data: res } = await api.put(pathName, data);
        if (res) {
          mutate();
          message.success("Success edit data");
        } else {
          console.log(error);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
        setStatus("done");
      }
    },
    [pathName]
  );

  return {
    data,
    onAdd,
    onDelete,
    onUpdate,
    loading: (!error && !data) || loading || isValidating,
    status,
    progress,
    size,
    setSize,
  };
};
