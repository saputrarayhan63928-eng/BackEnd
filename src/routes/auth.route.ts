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
 * /api/v1/auth/register:
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
 *                   example: Register berhasil
 *                 data:
 *                   $ref: '#/components/schemas/AuthUser'
 *       400:
 *         description: Request body tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Validasi gagal
 *                 errors:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ErrorItem'
 *       401:
 *         description: Header x-api-key tidak dikirim
*/

router.post("/auth/register", registerValidation, authController.register);

/**
 * @swagger
 * /api/v1/auth/login:
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
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login Berhasil
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/AuthUser'
 *                     token:
 *                       type: string
 *       400:
 *         description: Request body tidak valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Validasi gagal
 *                 errors:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ErrorItem'
 *       401:
 *         description: Email atau password salah, atau header x-api-key tidak dikirim
 */

router.post("/auth/login", loginValidation, authController.login);

export default router;
