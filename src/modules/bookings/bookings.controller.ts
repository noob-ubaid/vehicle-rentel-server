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
export const bookingsController = {
  createBookings,
  getBookings
};
