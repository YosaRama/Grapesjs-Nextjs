import nextConnect from "next-connect";
import multer from "multer";
import { Query } from "../../../db";
import sharp from "sharp";
import path from "path";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/images",
    filename: (req, file, cb) =>
      cb(null, file.originalname.split(" ").join("_")),
  }),
});

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

//* Upload single file
// apiRoute.post(upload.single("theFiles"), async (req, res) => {
//   const file = req.file;
//   const fileName = file.filename;
//   const fileType = file.mimetype;
//   const filePath = file.path.replace("public", "");
//   try {
//     const result = await Query(
//       "INSERT INTO media (dimension, filename, mimetype, url) VALUES (?,?,?,?)",
//       ["main", fileName, fileType, filePath]
//     );
//     res.status(200).json({ data: "Success save file" });
//   } catch (error) {
//     throw new Error(error);
//   }
// });

//* Upload Multiple file with client side handle
// apiRoute.post(upload.array("theFiles"), async (req, res) => {
//   const files = await req.files;
//   try {
//     files.map(async (file) => {
//       const fileName = file.filename;
//       const fileType = file.mimetype;
//       const filePath = file.path.replace("public", "");
//       const queryName = fileName.split("@");
//       let dimension = "main";
//       if (queryName[0] === "150px") {
//         dimension = "small";
//       }
//       if (queryName[0] === "720px") {
//         dimension = "medium";
//       }
//       if (queryName[0] === "1920px") {
//         dimension = "large";
//       }

//       if (
//         queryName[0] !== "150px" &&
//         queryName[0] !== "720px" &&
//         queryName[0] !== "1920px"
//       ) {
//         const result = await Query(
//           "INSERT INTO media (dimension, filename, mimetype, url) VALUES (?,?,?,?)",
//           [dimension, fileName, fileType, filePath]
//         );
//       } else {
//         const parentId = await Query("SELECT id FROM media WHERE filename=?", [
//           queryName[1],
//         ]);
//         const currentId = await parentId[0]?.id;

//         const result = await Query(
//           "INSERT INTO media (parent_id, dimension, filename, mimetype, url) VALUES (?,?,?,?,?)",
//           [currentId, dimension, fileName, fileType, filePath]
//         );
//       }
//     });
//     res.status(200).json({ data: "Success save file" });
//   } catch (error) {
//     throw new Error(error);
//   }
// });

//* Upload file with server side
apiRoute.post(upload.single("theFiles"), async (req, res) => {
  const file = req.file;
  const fileName = file.filename;
  const fileType = file.mimetype;
  const filePath = file.path.replace("public", "");
  const fileDest = file.destination.substr(8, file.destination.length);

  try {
    const result = await Query(
      "INSERT INTO media (dimension, filename, mimetype, url) VALUES (?,?,?,?)",
      ["main", fileName, fileType, filePath]
    );
    if (result) {
      try {
        // Resize to 1920px
        await sharp(req.file.path)
          .resize(1920)
          .toFile(
            path.resolve(req.file.destination, "1920px@" + fileName),
            async (err, info) => {
              try {
                const parentId = await Query(
                  "SELECT id FROM media WHERE filename=?",
                  [fileName]
                );
                const currentId = await parentId[0]?.id;
                const thumbUrl = await (fileDest + "/1920px@" + fileName);

                const result = await Query(
                  "INSERT INTO media (parent_id, dimension, filename, mimetype, url) VALUES (?,?,?,?,?)",
                  [currentId, "large", fileName, fileType, thumbUrl]
                );
              } catch (e) {
                console.log(e);
              }
            }
          );
        // Resize to 720px
        await sharp(req.file.path)
          .resize(720)
          .toFile(
            path.resolve(req.file.destination, "720px@" + fileName),
            async (err, info) => {
              try {
                const parentId = await Query(
                  "SELECT id FROM media WHERE filename=?",
                  [fileName]
                );
                const currentId = await parentId[0]?.id;
                const thumbUrl = await (fileDest + "/720px@" + fileName);

                const result = await Query(
                  "INSERT INTO media (parent_id, dimension, filename, mimetype, url) VALUES (?,?,?,?,?)",
                  [currentId, "medium", fileName, fileType, thumbUrl]
                );
                if (result) {
                  res.status(200).send({ message: "Success upload file" });
                }
              } catch (e) {
                console.log(e);
              }
            }
          );
        // Resize to 150px
        await sharp(req.file.path)
          .resize(150)
          .toFile(
            path.resolve(req.file.destination, "150px@" + fileName),
            async (err, info) => {
              try {
                const parentId = await Query(
                  "SELECT id FROM media WHERE filename=?",
                  [fileName]
                );
                const currentId = await parentId[0]?.id;
                const thumbUrl = await (fileDest + "/150px@" + fileName);

                const result = await Query(
                  "INSERT INTO media (parent_id, dimension, filename, mimetype, url) VALUES (?,?,?,?,?)",
                  [currentId, "small", fileName, fileType, thumbUrl]
                );
              } catch (e) {
                console.log(e);
              }
            }
          );
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    console.log(e);
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
