import nextConnect from "next-connect";
import multer from "multer";
import multerSharp from "multer-sharp-s3";
import aws from "aws-sdk";
import { Query } from "../../../db";

// * Upload to S3
aws.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_KEY_ID,
});
const bucketName = process.env.S3_BUCKET_NAME;

const s3 = new aws.S3();

const storage = multerSharp({
  Key: (req, file, cb) => {
    cb(null, file.originalname);
  },
  s3,
  Bucket: bucketName,
  multiple: true,
  resize: [
    { suffix: "@1920px", width: 1920 },
    { suffix: "@720px", width: 720 },
    { suffix: "@150px", width: 150 },
    { suffix: "original" },
  ],
});

var upload = multer({
  storage: storage,
});

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
  const file = req?.file;
  const originalName = file?.original?.Key || file?.originalname;
  const originalPath = file?.original?.Location || file?.Location;
  const fileType = file?.mimetype;
  const largeFile = file["@1920px"];
  const mediumFile = file["@720px"];
  const smallFile = file["@150px"];

  try {
    const result = await Query(
      "INSERT INTO media (type, dimension, filename, mimetype, url) VALUES (?,?,?,?,?)",
      ["media", "main", originalName, fileType, originalPath]
    );
    if (result && fileType === "image/jpeg") {
      try {
        const parentId = await Query("SELECT id FROM media WHERE filename=?", [
          originalName,
        ]);
        const currentId = await parentId[0]?.id;

        // Large image detail
        const largeThumbName = largeFile.Key;
        const largeThumbUrl = largeFile.Location;

        const largeSize = await Query(
          "INSERT INTO media (parent_id, type, dimension, filename, mimetype, url) VALUES (?,?,?,?,?,?)",
          [
            currentId,
            "thumbnail",
            "large",
            largeThumbName,
            fileType,
            largeThumbUrl,
          ]
        );

        // Medium image detail
        const mediumThumbName = mediumFile.Key;
        const mediumThumbUrl = mediumFile.Location;

        const mediumSize = await Query(
          "INSERT INTO media (parent_id, type, dimension, filename, mimetype, url) VALUES (?,?,?,?,?,?)",
          [
            currentId,
            "thumbnail",
            "medium",
            mediumThumbName,
            fileType,
            mediumThumbUrl,
          ]
        );

        // Small image detail
        const smallThumbName = smallFile.Key;
        const smallThumbUrl = smallFile.Location;

        const smallSize = await Query(
          "INSERT INTO media (parent_id, type, dimension, filename, mimetype, url) VALUES (?,?,?,?,?,?)",
          [
            currentId,
            "thumbnail",
            "small",
            smallThumbName,
            fileType,
            smallThumbUrl,
          ]
        );

        if (smallSize && mediumSize && largeSize) {
          res.status(200).send({ message: "All image serve!" });
        } else {
          res.status(200).send({ message: "Error both of file!" });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      res.status(200).send({ message: "File success to save" });
    }
  } catch (err) {
    console.log(err);
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
