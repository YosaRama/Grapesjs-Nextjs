import nc from "next-connect";
import { Query } from "../../../db";

const handler = nc().get(async (req, res) => {
  const { pageTitle } = req.query;
  try {
    const result = await Query("SELECT * FROM pages WHERE title=?", [
      pageTitle,
    ]);
    res.status(200).json({ data: result[0] });
  } catch (e) {
    throw new Error(e);
  }
});

export default handler;
