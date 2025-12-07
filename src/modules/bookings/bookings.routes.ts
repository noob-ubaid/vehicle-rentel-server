import { Router } from "express";
import { bookingsController } from "./bookings.controller";
import { auth } from "../../middleware/auth";

const router = Router();
router.post("/", bookingsController.createBookings);
router.get("/",auth("customer"), bookingsController.getBookings);
router.put("/:bookingId", auth("customer", "admin"), bookingsController.updateBooking);
export const bookingsRoute = router;
