import { Request, Response } from "express";
import { vehiclesService } from "./vehicles.service";

const createVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.createVehicles(req.body);
    return res.status(200).json({
      success: true,
      message: "Vehicles created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllVehicles = async(req: Request, res: Response) => {
    try {
        const result = await vehiclesService.getAllVehicles()
        return res.status(200).json({
      success: true,
      message: "Vehicles created successfully",
      data: result.rows,
    });
    } catch (error:any) {
        res.status(500).json({
      success: false,
      message: error.message,
    }); 
    }
}
export const vehiclesController = {
  createVehicles,
  getAllVehicles
};
