import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

export const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const headerToken = req.headers.authorization;
      if (!headerToken) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized! Token missing" });
      }
      const token = headerToken.startsWith("Bearer ")
        ? headerToken.split(" ")[1]
        : headerToken;

      const decoded = jwt.verify(
        token as string,
        config.jwt_secret as string
      ) as JwtPayload;
      req.user = decoded;
      if (roles.length && !roles.includes(decoded.role as string)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden! You do not have permission.",
        });
      }
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };
};
