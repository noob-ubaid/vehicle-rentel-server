import express, { Request, Response } from "express";
import initDB from "./config/db";
import config from "./config";
import { authRoutes } from "./modules/auth/auth.route";
import { vehiclesRoutes } from "./modules/vehicles/vehicles.routes";
import { bookingsRoute } from "./modules/bookings/bookings.routes";
const app = express();
const port = config.port;
app.use(express.json())
initDB();
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/vehicles', vehiclesRoutes)
app.use('/api/v1/bookings', bookingsRoute)
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
