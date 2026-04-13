import prisma from "../utils/prisma";
import {} from "../models/product.mode";
export const findAll = async (skip, take, where, orderBy) => {
    return await prisma.product.findMany({
        skip,
        take,
        where,
        orderBy,
        include: { category: true }, // Relation selalu di repo atau service sesuai kebutuhan
    });
};
export const countAll = async (where) => {
    return await prisma.product.count({ where });
};
export const findById = async (id) => {
    return await prisma.product.findUnique({
        where: { id, deletedAt: null },
        include: { category: true },
    });
};
export const create = async (data) => {
    return await prisma.product.create({ data });
};
export const update = async (id, data) => {
    return await prisma.product.update({
        where: { id },
        data,
    });
};
export const softDelete = async (id) => {
    return await prisma.product.update({
        where: { id },
        data: { deletedAt: new Date() },
    });
};
export class ProductRepository {
    // Simulasi database (ganti dengan real DB connection)
    products = [];
    currentId = 1;
    async findAll() {
        return this.products;
    }
    async findById(id) {
        return this.products.find((p) => p.id === id);
    }
    async create(data) {
        const newProduct = {
            id: this.currentId++,
            ...data,
            createdAt: new Date(),
        };
        this.products.push(newProduct);
        return newProduct;
    }
    async update(id, data) {
        const index = this.products.findIndex((p) => p.id === id);
        if (index === -1)
            return null;
        this.products[index] = {
            ...this.products[index],
            ...data,
        };
        return this.products[index];
    }
    async delete(id) {
        const index = this.products.findIndex((p) => p.id === id);
        if (index === -1)
            return false;
        this.products.splice(index, 1);
        return true;
    }
}
//# sourceMappingURL=product.repository.js.map