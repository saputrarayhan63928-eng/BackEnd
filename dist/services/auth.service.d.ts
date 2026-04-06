export declare const register: (data: {
    name: string;
    email: string;
    password: string;
    role?: string;
}) => Promise<{
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    email: string;
    password: string;
    role: string;
}>;
export declare const login: (data: {
    email: string;
    password: string;
}) => Promise<{
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
//# sourceMappingURL=auth.service.d.ts.map