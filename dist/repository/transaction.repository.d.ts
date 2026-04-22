import type { Prisma } from "@prisma/client";
export declare class TransactionRepository {
    findAll(skip: number, take: number, where: Prisma.TransactionWhereInput, orderBy: Prisma.TransactionOrderByWithRelationInput): Promise<({
        user: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
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
    })[]>;
    countAll(where: Prisma.TransactionWhereInput): Promise<number>;
    findById(id: number): Promise<({
        user: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
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
    executeInTransaction<T>(callback: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T>;
    findProductById(tx: Prisma.TransactionClient, productId: number): Promise<{
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
    } | null>;
    decrementProductStock(tx: Prisma.TransactionClient, productId: number, quantity: number): Promise<{
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
    }>;
    createTransaction(tx: Prisma.TransactionClient, userId: number, total: number, items: Prisma.TransactionItemCreateWithoutTransactionInput[]): Promise<{
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
}
//# sourceMappingURL=transaction.repository.d.ts.map