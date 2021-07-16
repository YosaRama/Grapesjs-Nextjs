import nextConnect from "next-connect";
import { Query } from "../../../db";
import fs from "fs";

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
  const fileUrl = "./public/" + req.body.url;
  try {
    fs.unlinkSync(fileUrl);
    const result = await Query("DELETE FROM media WHERE id=?", [fileId]);
    res.status(200).json({ message: "Success Delete" });
  } catch (error) {
    console.log(error);
  }
});

export default apiRoute;
