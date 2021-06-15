import nc from "next-connect";
import { Query } from "../../../db";

const handler = nc()
  .get(async (req, res) => {
    try {
      const result = await Query("SELECT * FROM pages");
      res.status(200).json({ result: result });
    } catch (e) {
      throw new Error(e);
    }
  })
  .post(async (req, res) => {
    const { title, content, styles } = req.body;
    try {
      const result = await Query(
        "INSERT INTO pages (title, content, styles) VALUES (?,?,?)",
        [title, content, styles]
      );
      res.status(201).json({
        data: {
          title,
          content,
          styles,
        },
      });
    } catch (e) {
      console.log("error");
    }
  });

export default handler;
