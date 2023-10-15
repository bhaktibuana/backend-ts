import { Router } from "express";
const router = Router();

/* [START ROUTING] */
import userRoute from "../masterUser/user.route";
router.use("/user", userRoute);
/* [END ROUTING] */

export default router;
