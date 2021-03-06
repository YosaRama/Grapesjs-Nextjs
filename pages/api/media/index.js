import nextConnect from "next-connect";
import { Query } from "../../../db";
import fs from "fs";

const apiRoute = nextConnect({
  // onError(error, req, res) {
  //   res
  //     .status(501)
  //     .json({ error: `Sorry something Happened! ${error.message}` });
  // },
  // onNoMatch(req, res) {
  //   res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  // },
});

apiRoute.get(async (req, res) => {
  const limit = +req?.query?.page * 25;
  try {
    const result = await Query(
      "SELECT a.*, (SELECT b.url FROM media AS b WHERE b.dimension='medium' AND b.parent_id = a.id) AS thumb_url FROM media AS a WHERE dimension='main' ORDER BY created_at DESC LIMIT 25 OFFSET ?",
      [limit]
    );
    res.status(200).json({ data: result });
  } catch (error) {
    throw new Error(error.message);
  }
});

apiRoute.delete(async (req, res) => {
  const fileId = req.body.id;
  const fileUrl = "./public/" + req.body.url;
  try {
    const filesUrl = await Query(
      "SELECT url FROM media WHERE id=? OR parent_id=?",
      [fileId, fileId]
    );
    try {
      const fileUrlString = JSON.stringify(filesUrl);
      const fileUrlArray = JSON.parse(fileUrlString);
      const unlinkFile = fileUrlArray.map((fileUrl) => {
        const filePath = "./public/" + fileUrl.url;
        fs.unlinkSync(filePath);
      });
      if (unlinkFile) {
        const result = await Query(
          "DELETE FROM media WHERE id=? OR parent_id=?",
          [fileId, fileId]
        );
        if (result) {
          res.status(200).json({ message: "Success Delete" });
        }
      } else {
        console.log("Unsuccess to unlink file");
      }
    } catch (e) {
      console.log("Error when try unlink");
    }
  } catch (error) {
    console.log(error);
  }
});

apiRoute.put(async (req, res) => {
  const id = req.body.id;
  const fileTitle = req.body.title || null;
  const fileAlt = req.body.alt || null;
  const fileDesc = req.body.description || null;
  const updateAt = fileTitle || fileAlt || fileDesc ? new Date() : null;

  try {
    // console.log(id, fileTitle, fileAlt, fileDesc, updateAt);
    const result = await Query(
      "UPDATE media SET title=?,alt_text=?,description=?,updated_at=? WHERE id=?",
      [fileTitle, fileAlt, fileDesc, updateAt, id]
    );
    res.status(200).json({ message: "Success update file" });
  } catch (e) {
    console.log(e);
  }
});

export default apiRoute;
