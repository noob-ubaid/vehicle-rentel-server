import { Request, Response } from "express";
import { authServices } from "./auth.service";

const createUser = async (req: Request, res: Response) => {
  const { password, email } = req.body;

  try {
    const result = await authServices.createUser(email, password);

    if (result === null) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (result === false) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const authController = {
  createUser,
};






