import { Router } from "express";
import { checkout, getDetail } from "../controllers/transaction.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/checkout", authenticate, checkout);
router.get("/:id", getDetail);

export default router;
