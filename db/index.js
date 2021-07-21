import mysql from "serverless-mysql";

export const db = mysql({
  config: {
    host: process.env.MYSQL_ENDPOINT_LOCAL,
    database: process.env.MYSQL_DATABASE_LOCAL,
    port: process.env.MYSQL_PORT_LOCAL,
    user: process.env.MYSQL_USERNAME_LOCAL,
    password: process.env.MYSQL_PASSWORD_LOCAL,
  },
});

export async function Query(query, value) {
  try {
    const results = await db.query(query, value);
    await db.end();
    return results;
  } catch (err) {
    throw new Error("Database connection is error", err);
  }
}
