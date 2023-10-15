import { Router } from "express";
import { userController } from "../../controllers";

const router = Router();

router.get("/", userController.getData);
router.post("/", userController.createData);
router.put("/", userController.updateData);
router.delete("/", userController.deleteData);

export default router;
