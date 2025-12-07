import { Request, Response } from "express";
import { bookingsService } from "./bookings.service";

const createBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingsService.createBookings(req.body);
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingsService.getBookings(
      req?.user?.role as string,
      req?.user?.id as string
    );
    res.status(201).json({
      success: true,
      message: "All bookings",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {
    const bookingId = Number(req.params.bookingId);
    const role = req.user?.role as string;
    const userId = Number(req.user?.id);

    const result = await bookingsService.updateBooking(bookingId, role, userId);
    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
export const bookingsController = {
  createBookings,
  getBookings,
  updateBooking,
};
