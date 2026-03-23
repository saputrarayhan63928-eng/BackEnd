import { type Request, type Response } from "express";
import * as AuthService from "../services/auth.service";
import { asyncHandler } from "../utils/async.handler";
import { successResponse } from "../utils/response";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await AuthService.register(req.body);
  const { password, ...userWithoutPassword } = user;

  return successResponse(
    res,
    "Register berhasil",
    userWithoutPassword,
    null,
    201
  );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  const { password, ...userWithoutPassword } = result.user;

  return successResponse(res, "Login Berhasil", {
    user: userWithoutPassword,
    token: result.token,
  });
});
