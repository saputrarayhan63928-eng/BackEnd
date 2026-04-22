import { AuthService } from "../services/auth.service.js";
import { successResponse } from "../utils/response.js";
export class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    register = async (req, res, next) => {
        try {
            const user = await this.authService.register(req.body);
            const { password, ...userWithoutPassword } = user;
            return successResponse(res, "Register berhasil", userWithoutPassword, null, 201);
        }
        catch (error) {
            next(error);
        }
    };
    login = async (req, res, next) => {
        try {
            const result = await this.authService.login(req.body);
            const { password, ...userWithoutPassword } = result.user;
            return successResponse(res, "Login Berhasil", {
                user: userWithoutPassword,
                token: result.token,
            });
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=auth.controller.js.map