import { AuthRepository } from "../repository/auth.repository.js";
export declare const AUTH_ROLES: readonly ["ADMIN", "MEMBER"];
export type AuthRole = (typeof AUTH_ROLES)[number];
export interface RegisterInput {
    name: string;
    email: string;
    password: string;
    role?: string;
}
export interface LoginInput {
    email: string;
    password: string;
}
export declare class AuthService {
    private readonly repository;
    constructor(repository: AuthRepository);
    register(data: RegisterInput): Promise<import("../repository/auth.repository.js").AuthUser>;
    login(data: LoginInput): Promise<{
        user: import("../repository/auth.repository.js").AuthUser;
        token: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map