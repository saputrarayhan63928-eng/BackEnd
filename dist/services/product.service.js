import { ProductRepository } from "../repository/product.repository";
const allowedSortFields = [
    "id",
    "name",
    "price",
    "stock",
    "createdAt",
    "updatedAt",
];
export class ProductService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async getAllProducts(params) {
        const { page, limit, search, sortBy, sortOrder } = params;
        const skip = (page - 1) * limit;
        const orderByField = allowedSortFields.includes(sortBy)
            ? sortBy
            : "createdAt";
        const whereClause = {
            deletedAt: null,
        };
        if (search?.name) {
            whereClause.name = {
                contains: search.name,
                mode: "insensitive",
            };
        }
        if (search?.maxPrice !== undefined) {
            whereClause.price = {
                lte: search.maxPrice,
            };
        }
        const products = await this.repository.findAll(skip, limit, whereClause, {
            [orderByField]: sortOrder || "desc",
        });
        const totalItems = await this.repository.countAll(whereClause);
        return {
            products,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
        };
    }
    async getProductById(id) {
        const product = await this.repository.findById(id);
        if (!product) {
            throw new Error("Produk tidak ditemukan");
        }
        return product;
    }
    async createProduct(data) {
        if (data.price <= 0) {
            throw new Error("Price must be greater than 0");
        }
        if ((data.stock ?? 0) < 0) {
            throw new Error("Stock cannot be negative");
        }
        return this.repository.create({
            name: data.name,
            price: data.price,
            stock: data.stock ?? 0,
            image: data.image,
            ...(data.description !== undefined ? { description: data.description } : {}),
            ...(data.categoryId
                ? {
                    category: {
                        connect: { id: data.categoryId },
                    },
                }
                : {}),
        });
    }
    async updateProduct(id, data) {
        await this.getProductById(id);
        if (data.price !== undefined && data.price <= 0) {
            throw new Error("Price must be greater than 0");
        }
        if (data.stock !== undefined && data.stock < 0) {
            throw new Error("Stock cannot be negative");
        }
        return this.repository.update(id, {
            ...(data.name !== undefined ? { name: data.name } : {}),
            ...(data.description !== undefined
                ? { description: data.description }
                : {}),
            ...(data.price !== undefined ? { price: data.price } : {}),
            ...(data.stock !== undefined ? { stock: data.stock } : {}),
            ...(data.image !== undefined ? { image: data.image } : {}),
            ...(data.categoryId !== undefined
                ? data.categoryId === null
                    ? { category: { disconnect: true } }
                    : { category: { connect: { id: data.categoryId } } }
                : {}),
        });
    }
    async deleteProduct(id) {
        await this.getProductById(id);
        return this.repository.softDelete(id);
    }
    async execute() {
        const stats = await this.repository.getStatistics();
        const categoryStats = await this.repository.getProductsByCategotyStats();
        return {
            overview: stats,
            byCategory: categoryStats
        };
    }
}
//# sourceMappingURL=product.service.js.map