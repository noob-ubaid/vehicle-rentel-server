import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middleware/auth";

const router = Router();
router.get("/", auth("admin"), userController.getAllUser);
router.delete("/:userId", userController.deleteUser);

export const userRoutes = router;
