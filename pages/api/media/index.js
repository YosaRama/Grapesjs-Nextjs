import nextConnect from "next-connect";
import multer from "multer";
import { Query } from "../../../db";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/images",
    filename: (req, file, cb) =>
      cb(null, file.originalname.split(" ").join("_")),
  }),
});

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

apiRoute.post(upload.single("theFiles"), async (req, res) => {
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  const filePath = req.file.path.replace("public", "");
  try {
    const result = await Query(
      "INSERT INTO media (url, type, name) VALUES (?,?,?)",
      [filePath, fileType, fileName]
    );
    res.status(200).json({ data: "Success save file" });
  } catch (error) {
    throw new Error(error);
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
