import { Router, Request, Response } from "express";
import { response } from "../utils";
import appRoute from "./app/app.route";

const router = Router();

router.use("/api", appRoute);
router.use("/:anyRoute", (req: Request, res: Response): void => {
  const url = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
  response(`URL not found for: ${url}`, 404, res);
});
router.use("/", (req: Request, res: Response): void => {
  const url = `${req.protocol}://${req.headers.host}`;
  response("Banckend TS API", 200, res, { url });
});

export default router;
