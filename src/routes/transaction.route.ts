import { Router } from "express";
import { checkout, getDetail } from "../controllers/transaction.controller";

const router = Router()

router.post("/checkout", checkout)
router.get("/:id", getDetail)

export default router