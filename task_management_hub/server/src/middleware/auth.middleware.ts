import type { Request, Response, NextFunction } from "express";

export const authorizeDelete = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secret = req.headers["x-delete-secret"];

  if (secret !== "ADMIN_SECRET") {
    return res.status(403).json({
      success: false,
      message: "Unauthorized delete operation",
    });
  }

  next();
};