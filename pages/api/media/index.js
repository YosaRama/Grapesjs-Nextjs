import nextConnect from "next-connect";
import { Query } from "../../../db";
import fs from "fs";
import aws from "aws-sdk";
import { file } from "jszip";

aws.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_KEY_ID,
});
const bucketName = process.env.S3_BUCKET_NAME;

const s3 = new aws.S3();

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.get(async (req, res) => {
  try {
    const result = await Query("SELECT * FROM media");
    res.status(200).json({ data: result });
  } catch (error) {
    throw new Error(error.message);
  }
});

apiRoute.delete(async (req, res) => {
  const fileId = req.body.id;
  const fileUrl = req.body.url;
  try {
    s3.deleteObject({ Bucket: bucketName, Key: fileUrl }, (err, data) => {
      console.log(err);
      console.log(data);
    });
    const result = await Query("DELETE FROM media WHERE id=?", [fileId]);
    res.status(200).json({ message: "Success Delete" });
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
