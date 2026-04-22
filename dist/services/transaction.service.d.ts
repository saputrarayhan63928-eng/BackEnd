import type { Prisma } from "@prisma/client";
import { TransactionRepository } from "../repository/transaction.repository.js";
export interface FindAllTransactionsParams {
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
export interface CheckoutItemInput {
    productId: number;
    quantity: number;
}
export declare class TransactionService {
    private readonly repository;
    constructor(repository: TransactionRepository);
    getAllTransactions(params: FindAllTransactionsParams): Promise<{
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
    checkout(userId: number, items: CheckoutItemInput[]): Promise<{
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
    getTransactionById(id: number): Promise<({
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
//# sourceMappingURL=transaction.service.d.ts.map