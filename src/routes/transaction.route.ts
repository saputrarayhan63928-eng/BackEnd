import { Router } from "express";
import { TransactionController } from "../controllers/transaction.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { TransactionRepository } from "../repository/transaction.repository";
import { TransactionService } from "../services/transaction.service";

const router = Router();

const transactionRepository = new TransactionRepository();
const transactionService = new TransactionService(transactionRepository);
const transactionController = new TransactionController(transactionService);

router.get("/", transactionController.listTransactions);
router.post("/checkout", authenticate, transactionController.checkout);
router.get("/:id", transactionController.getDetail);

export default router;
