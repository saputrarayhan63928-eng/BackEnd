import { AuthRepository } from "../repository/auth.repository";
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
    register(data: RegisterInput): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        email: string;
        password: string;
        role: string;
    }>;
    login(data: LoginInput): Promise<{
        user: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            email: string;
            password: string;
            role: string;
        };
        token: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map