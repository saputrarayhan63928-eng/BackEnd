export declare class TransactionService {
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
                price: import("@prisma/client-runtime-utils").Decimal;
                stock: number;
                categoryId: number | null;
                deletedAt: Date | null;
            };
        } & {
            id: number;
            transactionId: number;
            productId: number;
            quantity: number;
            priceAtTime: import("@prisma/client-runtime-utils").Decimal;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: number;
        total: import("@prisma/client-runtime-utils").Decimal;
    }>;
    static getTransactionById(id: number): Promise<({
        user: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            deletedAt: Date | null;
            email: string;
        };
        item: ({
            product: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                price: import("@prisma/client-runtime-utils").Decimal;
                stock: number;
                categoryId: number | null;
                deletedAt: Date | null;
            };
        } & {
            id: number;
            transactionId: number;
            productId: number;
            quantity: number;
            priceAtTime: import("@prisma/client-runtime-utils").Decimal;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        userId: number;
        total: import("@prisma/client-runtime-utils").Decimal;
    }) | null>;
}
//# sourceMappingURL=transaction.service.d.ts.map