import { Router } from "express";
import { bookingsController } from "./bookings.controller";
import { auth } from "../../middleware/auth";

const router = Router();
router.post("/", bookingsController.createBookings);
router.get("/",auth("customer"), bookingsController.getBookings);
export const bookingsRoute = router;
