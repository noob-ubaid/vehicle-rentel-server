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
const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesService.getAllVehicles();
    return res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully ",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleVehicle = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;
  try {
    const result = await vehiclesService.getSingleVehicle(vehicleId as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle retrieved successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateSingleVehicle = async (req: Request, res: Response) => {
  const { vehicleId } = req.params;
  try {
    const result = await vehiclesService.updateSingleVehicle(
      vehicleId as string,
      req.body
    );
    res.status(200).json({
      success: false,
      message: "Vehicle updated successfully",
      data:result.rows[0]
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const vehiclesController = {
  createVehicles,
  getAllVehicles,
  getSingleVehicle,
  updateSingleVehicle,
};
