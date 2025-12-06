import express, { Request, Response } from "express";
import initDB from "./config/db";
import config from "./config";
import { authRoutes } from "./modules/auth/auth.route";
const app = express();
const port = config.port;
app.use(express.json())
initDB();
app.use('/api/v1/auth', authRoutes)
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
