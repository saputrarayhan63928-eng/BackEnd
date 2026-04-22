import type { AuthRole } from "../services/auth.service.js";
export interface AuthUser {
    id: string;
    name: string;
    email: string;
    password: string;
    role: AuthRole;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
export declare class AuthRepository {
    findByEmail(email: string): Promise<AuthUser | null>;
    create(data: {
        name: string;
        email: string;
        password: string;
        role: AuthRole;
    }): Promise<AuthUser>;
}
//# sourceMappingURL=auth.repository.d.ts.map