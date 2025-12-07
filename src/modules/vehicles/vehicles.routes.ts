import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";
import { auth } from "../../middleware/auth";

const router = Router()
router.post("/",vehiclesController.createVehicles)
router.get("/" ,vehiclesController.getAllVehicles)
router.get("/:vehicleId",vehiclesController.getSingleVehicle)
router.put("/:vehicleId",vehiclesController.updateSingleVehicle)
export const vehiclesRoutes = router