export declare class AuthRepository {
    findByEmail(email: string): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        email: string;
        password: string;
        role: string;
    } | null>;
    create(data: {
        name: string;
        email: string;
        password: string;
        role: string;
    }): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        email: string;
        password: string;
        role: string;
    }>;
}
//# sourceMappingURL=auth.repository.d.ts.map