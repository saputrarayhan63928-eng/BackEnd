import type { Prisma } from "@prisma/client";
interface FindAllParams {
    page: number;
    limit: number;
    search?: {
        userId?: number;
        minTotal?: number;
        maxTotal?: number;
    };
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
export declare class TransactionService {
    static getAll(params: FindAllParams): Promise<{
        transactions: ({
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
            item: ({
                product: {
                    name: string;
                    id: number;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string | null;
                    price: Prisma.Decimal;
                    stock: number;
                    image: string;
                    categoryId: number | null;
                    deletedAt: Date | null;
                };
            } & {
                id: number;
                transactionId: number;
                productId: number;
                quantity: number;
                priceAtTime: Prisma.Decimal;
            })[];
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            userId: number;
            total: Prisma.Decimal;
        })[];
        totalItems: number;
        totalPages: number;
        currentPage: number;
    }>;
    static checkout(userId: number, items: {
        productId: number;
        quantity: number;
    }[]): Promise<{
        item: ({
            product: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                price: Prisma.Decimal;
                stock: number;
                image: string;
                categoryId: number | null;
                deletedAt: Date | null;
            };
        } & {
            id: number;
            transactionId: number;
            productId: number;
            quantity: number;
            priceAtTime: Prisma.Decimal;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: number;
        total: Prisma.Decimal;
    }>;
    static getTransactionById(id: number): Promise<({
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
        item: ({
            product: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                price: Prisma.Decimal;
                stock: number;
                image: string;
                categoryId: number | null;
                deletedAt: Date | null;
            };
        } & {
            id: number;
            transactionId: number;
            productId: number;
            quantity: number;
            priceAtTime: Prisma.Decimal;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: number;
        total: Prisma.Decimal;
    }) | null>;
}
export {};
//# sourceMappingURL=transaction.service.d.ts.map