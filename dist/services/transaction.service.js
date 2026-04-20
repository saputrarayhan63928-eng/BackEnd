import { TransactionRepository } from "../repository/transaction.repository";
const allowedSortFields = ["id", "total", "createdAt", "updatedAt"];
export class TransactionService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async getAllTransactions(params) {
        const { page, limit, search, sortBy, sortOrder } = params;
        const skip = (page - 1) * limit;
        const orderByField = allowedSortFields.includes(sortBy)
            ? sortBy
            : "createdAt";
        const whereClause = {
            deletedAt: null,
        };
        if (search?.userId) {
            whereClause.userId = search.userId;
        }
        if (search?.minTotal !== undefined || search?.maxTotal !== undefined) {
            whereClause.total = {
                ...(search.minTotal !== undefined ? { gte: search.minTotal } : {}),
                ...(search.maxTotal !== undefined ? { lte: search.maxTotal } : {}),
            };
        }
        const transactions = await this.repository.findAll(skip, limit, whereClause, {
            [orderByField]: sortOrder || "desc",
        });
        const totalItems = await this.repository.countAll(whereClause);
        return {
            transactions,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
        };
    }
    async checkout(userId, items) {
        if (!items.length) {
            throw new Error("Item transaksi wajib diisi");
        }
        return this.repository.executeInTransaction(async (tx) => {
            let total = 0;
            const transactionItemsData = [];
            for (const item of items) {
                if (item.quantity <= 0) {
                    throw new Error("Quantity harus lebih dari 0");
                }
                const product = await this.repository.findProductById(tx, item.productId);
                if (!product) {
                    throw new Error(`Product with ID ${item.productId} not found`);
                }
                if (product.stock < item.quantity) {
                    throw new Error(`Insufficient stock for product ID ${item.productId}`);
                }
                const currentPrice = Number(product.price);
                total += currentPrice * item.quantity;
                transactionItemsData.push({
                    quantity: item.quantity,
                    priceAtTime: product.price,
                    product: {
                        connect: {
                            id: item.productId,
                        },
                    },
                });
                await this.repository.decrementProductStock(tx, item.productId, item.quantity);
            }
            return this.repository.createTransaction(tx, userId, total, transactionItemsData);
        });
    }
    async getTransactionById(id) {
        return this.repository.findById(id);
    }
}
//# sourceMappingURL=transaction.service.js.map