import prisma from "../utils/prisma";
const allowedSortFields = ["id", "total", "createdAt", "updatedAt"];
export class TransactionService {
    static async getAll(params) {
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
        const transactions = await prisma.transaction.findMany({
            skip,
            take: limit,
            where: whereClause,
            orderBy: { [orderByField]: sortOrder || "desc" },
            include: {
                user: true,
                item: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        const totalItems = await prisma.transaction.count({
            where: whereClause,
        });
        return {
            transactions,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
        };
    }
    static async checkout(userId, items) {
        return await prisma.$transaction(async (tx) => {
            let total = 0;
            const transactionItemsData = [];
            //  1. Loop setiap item untuk ambil data Product asli (Harga & Stok)
            for (const item of items) {
                const product = await tx.product.findUnique({
                    where: { id: item.productId, deletedAt: null },
                });
                if (!product) {
                    throw new Error(`Product with ID ${item.productId} not found`);
                }
                // Validasi Stok (Optional tapi recommended)
                if (product.stock < item.quantity) {
                    throw new Error(`Insufficient stock for product ID ${item.productId}`);
                }
                // Hitung Total (Harga DB x Quantity Request)
                const currentPrice = Number(product.price);
                total += currentPrice * item.quantity;
                // Siapkan data untuk disimpan ke pivot TransactionItem
                transactionItemsData.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    priceAtTime: product.price // PENTING: Simpan harga saat transaksi terjadi
                });
                // Update Stok (Decrement)
                await tx.product.update({
                    where: { id: item.productId, deletedAt: null },
                    data: { stock: { decrement: item.quantity } }
                });
            }
            // 2. Buat Header Transaksi & Detail Items sekaligus (Nested Write)
            const newTransaction = await tx.transaction.create({
                data: {
                    userId,
                    total, // Total hasil perhitungan real
                    item: {
                        create: transactionItemsData // Insert ke table pivot
                    }
                },
                include: {
                    item: {
                        include: { product: true } // Return response lengkap
                    }
                }
            });
            return newTransaction;
        });
    }
    static async getTransactionById(id) {
        return await prisma.transaction.findUnique({
            where: { id },
            include: {
                user: true, // Ambil data user
                item: {
                    include: {
                        product: true // Di dalam item, ambil data produknya (Nested Include)
                    }
                }
            }
        });
    }
}
//# sourceMappingURL=transaction.service.js.map