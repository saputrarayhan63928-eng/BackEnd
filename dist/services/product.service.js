import prisma from "../utils/prisma";
export class ProductService {
    static async getAll() {
        return prisma.product.findMany({
            where: { deletedAt: null },
        });
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
        return prisma.product.create({
            data,
        });
    }
    static async update(id, data) {
        await this.getById(id);
        return prisma.product.update({
            where: { id },
            data,
        });
    }
    static async delete(id) {
        await this.getById(id);
        return prisma.product.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    static async search(name, maxPrice) {
        const where = {
            deletedAt: null,
        };
        if (name) {
            where.name = { contains: name, mode: "insensitive" };
        }
        if (maxPrice !== undefined) {
            where.price = { lte: maxPrice };
        }
        return prisma.product.findMany({ where });
    }
}
//# sourceMappingURL=product.service.js.map