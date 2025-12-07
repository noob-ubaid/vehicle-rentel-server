import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";
import { auth } from "../../middleware/auth";

const router = Router()
router.post("/",auth("admin"),vehiclesController.createVehicles)
router.get("/" ,vehiclesController.getAllVehicles)
router.get("/:vehicleId",vehiclesController.getSingleVehicle)
router.put("/:vehicleId",auth("admin"),vehiclesController.updateSingleVehicle)
export const vehiclesRoutes = router