import nextConnect from "next-connect";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import fs from "fs";
import { Query } from "../../../db";

// * Upload to S3
aws.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_KEY_ID,
});
const bucketName = process.env.S3_BUCKET_NAME;

const s3 = new aws.S3();

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName,
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

// * Upload to local storage
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: "./public/images",
//     filename: (req, file, cb) =>
//       cb(null, file.originalname.split(" ").join("_")),
//   }),
// });

//* Error handling for API system
// const apiRoute = nextConnect({
//   onError(error, req, res) {
//     res
//       .status(501)
//       .json({ error: `Sorry something Happened! ${error.message}` });
//   },
//   onNoMatch(req, res) {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   },
// });

const apiRoute = nextConnect();

apiRoute.post(upload.single("theFiles"), async (req, res) => {
  const fileName = req.file.originalname;
  const fileType = req.file.mimetype;
  const filePath = req.file.location;
  try {
    const result = await Query(
      "INSERT INTO media (filename, mimetype, url) VALUES (?,?,?)",
      [fileName, fileType, filePath]
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
