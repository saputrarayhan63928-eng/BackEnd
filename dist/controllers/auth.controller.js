import {} from "express";
import * as AuthService from "../services/auth.service";
import { asyncHandler } from "../utils/async.handler";
import { successResponse } from "../utils/response";
export const register = asyncHandler(async (req, res) => {
    const user = await AuthService.register(req.body);
    const { password, ...userWithoutPassword } = user;
    return successResponse(res, "Register berhasil", userWithoutPassword, null, 201);
});
export const login = asyncHandler(async (req, res) => {
    const result = await AuthService.login(req.body);
    const { password, ...userWithoutPassword } = result.user;
    return successResponse(res, "Login Berhasil", {
        user: userWithoutPassword,
        token: result.token,
    });
});
//# sourceMappingURL=auth.controller.js.map