import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { loginValidation, registerValidation } from "../middlewares/auth.validation";
import { AuthRepository } from "../repository/auth.repository";
import { AuthService } from "../services/auth.service";

const router = Router();

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Manajemen autentikasi pengguna
*/

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register pengguna baru
 *     tags: [Auth]
 *     parameters:
 *       - $ref: '#/components/parameters/ApiKeyHeader'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *               role:
 *                 type: string
 *                 enum: [ADMIN, MEMBER]
 *                 example: MEMBER
 *     responses:
 *       201:
 *         description: Register berhasil
 *       400:
 *         description: Request body tidak valid
 *       401:
 *         description: Header x-api-key tidak dikirim
*/

router.post("/auth/register", registerValidation, authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login pengguna
 *     tags: [Auth]
 *     parameters:
 *       - $ref: '#/components/parameters/ApiKeyHeader'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: rahasia123
 *     responses:
 *       200:
 *         description: Login berhasil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Request body tidak valid
 *       401:
 *         description: Email atau password salah, atau header x-api-key tidak dikirim
 */

router.post("/auth/login", loginValidation, authController.login);

export default router;
