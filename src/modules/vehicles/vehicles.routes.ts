import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";

const router = Router()
router.post("/",vehiclesController.createVehicles)
router.get("/",vehiclesController.getAllVehicles)
router.get("/:vehicleId",vehiclesController.getSingleVehicle)
export const vehiclesRoutes = router