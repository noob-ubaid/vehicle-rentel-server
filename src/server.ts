import express, { Request, Response } from "express";
import initDB from "./config/db";
const app = express();
const port = 3000;
initDB();
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
