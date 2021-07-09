import nc from "next-connect";
import { Query } from "../../../db";
import multer from "multer";

const handler = nc()
  .get(async (req, res) => {
    try {
      const result = await Query("SELECT * FROM media");
      res.status(200).json({ result });
    } catch (error) {
      throw new Error(error.message);
    }
  })
  .post(async (req, res) => {
    // TODO : Create API system for upload file
    try {
      var upload = multer({ dest: "../../../public/images" });
      upload.single("uploaded_file");
      console.log(req.file, req.body);
    } catch (error) {
      throw new Error(error.message);
    }
  });

export default handler;
