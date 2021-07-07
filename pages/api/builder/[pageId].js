import nc from "next-connect";
import { Query } from "../../../db";

const handler = nc()
  .get(async (req, res) => {
    const { pageId } = req.query;
    try {
      const result = await Query("SELECT * FROM pages WHERE id=?", [pageId]);
      res.status(200).json({ data: result[0] });
    } catch (e) {
      throw new Error(e);
    }
  })
  .put(async (req, res) => {
    const { pageId } = req.query;
    const html = req.body.content;
    const styles = req.body.styles;
    try {
      const result = await Query(
        "UPDATE pages SET content=?,styles=? WHERE id=?",
        [html, styles, pageId]
      );
      res.status(200).json({
        result: {
          content: html,
          styles: styles,
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  });

export default handler;
