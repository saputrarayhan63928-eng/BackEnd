import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthRepository } from "../repository/auth.repository";
import { AuthService } from "../services/auth.service";

const router = Router();

const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

export default router;
