import prisma from "../utils/prisma";
const allowedSortFields = [
    "id",
    "name",
    "price",
    "stock",
    "createdAt",
    "updatedAt",
];
export class ProductService {
    static async getAll(params) {
        const { page, limit, search, sortBy, sortOrder } = params;
        const orderByField = allowedSortFields.includes(sortBy)
            ? sortBy
            : "createdAt";
        const skip = (page - 1) * limit;
        // 1. Buat Filter (Where Clause)
        const whereClause = {
            deletedAt: null, // Selalu filter yang belum dihapus (soft delete)
        };
        if (search?.name) {
            whereClause.name = { contains: search.name, mode: 'insensitive' };
        }
        if (search?.maxPrice) {
            whereClause.price = {
                lte: search.maxPrice
            };
        }
        //  Ambil data dgn pagination and sorting
        const products = await prisma.product.findMany({
            skip: skip,
            take: limit,
            where: whereClause,
            // gunakan array untuk orderBy agar dinamis
            orderBy: { [orderByField]: sortOrder || "desc" },
            include: {
                category: true
            }
        });
        // hitung total data (untuk metadata pagination)
        const totalItems = await prisma.product.count({
            where: whereClause
        });
        return {
            products,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page
        };
    }
    static async getById(id) {
        const product = await prisma.product.findFirst({
            where: { id, deletedAt: null },
        });
        if (!product) {
            throw new Error("Produk tidak ditemukan");
        }
        return product;
    }
    static async create(data) {
        const { categoryId, ...productData } = data;
        return prisma.product.create({
            data: {
                ...productData,
                ...(categoryId
                    ? {
                        category: {
                            connect: { id: categoryId },
                        },
                    }
                    : {}),
            },
        });
    }
    static async update(id, data) {
        await this.getById(id);
        const { categoryId, ...productData } = data;
        return prisma.product.update({
            where: { id },
            data: {
                ...productData,
                ...(categoryId !== undefined
                    ? {
                        category: categoryId
                            ? {
                                connect: { id: categoryId },
                            }
                            : {
                                disconnect: true,
                            },
                    }
                    : {}),
            },
        });
    }
    static async delete(id) {
        await this.getById(id);
        return prisma.product.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
}
//# sourceMappingURL=product.service.js.map