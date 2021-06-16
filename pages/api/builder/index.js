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
  })
  .delete(async (req, res) => {
    const pageId = req.body.id;
    try {
      const result = await Query("DELETE FROM pages WHERE id=?", [pageId]);
      res.status(200).json({ message: "Success Delete" });
    } catch (e) {
      throw new Error(e);
    }
  });

export default handler;
