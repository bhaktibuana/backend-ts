import { Response } from "express";

export const response = (
  message: string,
  status: number,
  res: Response,
  payload: any = null,
  metadata = {}
): void => {
  res.status(status).json([
    {
      status,
      message,
      payload,
      metadata,
    },
  ]);
};

export const serverErrorResponse = (error: any, res: Response): void => {
  res.status(500).json([
    {
      status: 500,
      message: "Internal server error",
      payload: error,
      metadata: {},
    },
  ]);
};
