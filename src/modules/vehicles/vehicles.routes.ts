import { Router } from "express";
import { vehiclesController } from "./vehicles.controller";

const router = Router()
router.post("/",vehiclesController.createVehicles)
export const vehiclesRoutes = router