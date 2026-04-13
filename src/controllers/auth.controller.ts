import type { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { successResponse } from "../utils/response";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.register(req.body);
      const { password, ...userWithoutPassword } = user;

      return successResponse(
        res,
        "Register berhasil",
        userWithoutPassword,
        null,
        201,
      );
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.login(req.body);
      const { password, ...userWithoutPassword } = result.user;

      return successResponse(res, "Login Berhasil", {
        user: userWithoutPassword,
        token: result.token,
      });
    } catch (error) {
      next(error);
    }
  };
}
