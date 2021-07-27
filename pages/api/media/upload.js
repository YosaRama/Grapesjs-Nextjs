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
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
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

apiRoute.post(upload.array("theFiles"), async (req, res) => {
  const files = await req.files;

  try {
    files.map(async (file) => {
      const fileName = file.originalname;
      const fileType = file.mimetype;
      const filePath = file.location;
      const queryName = fileName.split("@");
      let dimension = "main";
      if (queryName[0] === "150px") {
        dimension = "small";
      }
      if (queryName[0] === "720px") {
        dimension = "medium";
      }
      if (queryName[0] === "1920px") {
        dimension = "large";
      }

      if (
        queryName[0] !== "150px" &&
        queryName[0] !== "720px" &&
        queryName[0] !== "1920px"
      ) {
        const result = await Query(
          "INSERT INTO media (dimension, filename, mimetype, url) VALUES (?,?,?,?)",
          [dimension, fileName, fileType, filePath]
        );
      } else {
        const parentId = await Query("SELECT id FROM media WHERE filename=?", [
          queryName[1],
        ]);
        const currentId = await parentId[0]?.id;

        const result = await Query(
          "INSERT INTO media (parent_id, dimension, filename, mimetype, url) VALUES (?,?,?,?,?)",
          [currentId, dimension, fileName, fileType, filePath]
        );
      }
    });

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
