import { Router } from "express";
import { TransactionController } from "../controllers/transaction.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { TransactionRepository } from "../repository/transaction.repository";
import { TransactionService } from "../services/transaction.service";

const router = Router();

const transactionRepository = new TransactionRepository();
const transactionService = new TransactionService(transactionRepository);
const transactionController = new TransactionController(transactionService);

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Manajemen transaksi dan checkout
 */

/**
 * @swagger
 * /api/transaction:
 *   get:
 *     summary: Ambil daftar transaksi
 *     tags: [Transactions]
 *     parameters:
 *       - $ref: '#/components/parameters/ApiKeyHeader'
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Nomor halaman
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Jumlah data per halaman
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Filter transaksi berdasarkan user ID
 *       - in: query
 *         name: minTotal
 *         schema:
 *           type: number
 *         description: Minimal total transaksi
 *       - in: query
 *         name: maxTotal
 *         schema:
 *           type: number
 *         description: Maksimal total transaksi
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [id, total, createdAt, updatedAt]
 *         description: Field untuk sorting
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Urutan sorting
 *     responses:
 *       200:
 *         description: Daftar transaksi berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Daftar transaksi berhasil diambil
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transaction'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       401:
 *         description: Header x-api-key tidak dikirim
 */

/**
 * @swagger
 * /api/transaction/checkout:
 *   post:
 *     summary: Buat transaksi checkout
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ApiKeyHeader'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - item
 *             properties:
 *               item:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - productId
 *                     - quantity
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       200:
 *         description: Checkout berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Checkout Success
 *                 data:
 *                   $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Item transaksi tidak valid
 *       401:
 *         description: Token bearer atau x-api-key tidak valid / tidak dikirim
 */

/**
 * @swagger
 * /api/transaction/{id}:
 *   get:
 *     summary: Ambil detail transaksi berdasarkan ID
 *     tags: [Transactions]
 *     parameters:
 *       - $ref: '#/components/parameters/ApiKeyHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID transaksi
 *     responses:
 *       200:
 *         description: Detail transaksi berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Get transaction request sucses
 *                 data:
 *                   $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Header x-api-key tidak dikirim
 */

router.get("/", transactionController.listTransactions);
router.post("/checkout", authenticate, transactionController.checkout);
router.get("/:id", transactionController.getDetail);

export default router;
