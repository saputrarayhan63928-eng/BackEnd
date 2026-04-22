import prisma from "../utils/prisma.js";
export class TransactionRepository {
    async findAll(skip, take, where, orderBy) {
        return prisma.transaction.findMany({
            skip,
            take,
            where,
            orderBy,
            include: {
                user: true,
                item: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    }
    async countAll(where) {
        return prisma.transaction.count({ where });
    }
    async findById(id) {
        return prisma.transaction.findUnique({
            where: { id },
            include: {
                user: true,
                item: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    }
    async executeInTransaction(callback) {
        return prisma.$transaction(callback);
    }
    async findProductById(tx, productId) {
        return tx.product.findFirst({
            where: {
                id: productId,
                deletedAt: null,
            },
        });
    }
    async decrementProductStock(tx, productId, quantity) {
        return tx.product.update({
            where: { id: productId },
            data: {
                stock: {
                    decrement: quantity,
                },
            },
        });
    }
    async createTransaction(tx, userId, total, items) {
        return tx.transaction.create({
            data: {
                userId,
                total,
                item: {
                    create: items,
                },
            },
            include: {
                item: {
                    include: {
                        product: true,
                    },
                },
            },
        });
    }
}
//# sourceMappingURL=transaction.repository.js.map