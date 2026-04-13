import { countAll, findAll, create, update, softDelete, ProductRepository } from "../repository/product.repository";
import prisma from "../utils/prisma";
import {} from "../models/product.mode";
import { error } from "node:console";
const allowedSortFields = [
    "id",
    "name",
    "price",
    "stock",
    "createdAt",
    "updatedAt",
];
export class ProductServiceV2 {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async getAllProducts() {
        return await this.repository.findAll();
    }
    async getProductById(id) {
        const product = await this.repository.findById(id);
        if (!product) {
            throw new Error(`Product with id ${id} not found`);
        }
        return product;
    }
    async createProduct(data) {
        // Business logic: validasi
        if (data.price <= 0) {
            throw new Error('Price must be greater than 0');
        }
        if (data.stock < 0) {
            throw new Error('Stock cannot be negative');
        }
        return await this.repository.create(data);
    }
    async updateProduct(id, data) {
        const product = await this.repository.update(id, data);
        if (!product) {
            throw new Error(`Product with id ${id} not found`);
        }
        return product;
    }
    async deleteProduct(id) {
        const deleted = await this.repository.delete(id);
        if (!deleted) {
            throw new Error(`Product with id ${id} not found`);
        }
    }
    async checkStock(id) {
        const product = await this.getProductById(id);
        return (product.stock ?? 0) > 0;
    }
}
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
        const sortCriteria = sortBy ? { [sortBy]: sortOrder || "desc" } : { createdAt: "desc" };
        //  Ambil data dgn pagination and sorting
        const products = await findAll(skip, limit, whereClause, sortCriteria);
        // hitung total data (untuk metadata pagination)
        const totalItems = await countAll(whereClause);
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
        if (data.stock < 0)
            throw new Error('Stock Tidak boleh Negatif');
        if (data.price < 0)
            throw new Error('Stock Tidak boleh Negatif');
        return await create(data);
    }
    static async update(id, data) {
        await this.getById(id);
        if (data.stock < 0)
            throw new Error('Stock Tidak boleh Negatif');
        if (data.price < 0)
            throw new Error('Stock Tidak boleh Negatif');
        return await update(id, data);
    }
    static async delete(id) {
        await this.getById(id);
        return softDelete(id);
    }
}
//# sourceMappingURL=product.service.js.map