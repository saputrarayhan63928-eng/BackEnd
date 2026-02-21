import prisma from "../utils/prisma";
import type { Prisma, Product } from "@prisma/client";

export class ProductService {
  static async getAll(): Promise<Product[]> {
    return await prisma.product.findMany();
  }

  static async getById(id: number): Promise<Product> {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) throw new Error("Produk tidak ditemukan");
    return product;
  }

  static async create(data: {
    name: string;
    description: string;
    price: number;
    stock: number;
  }): Promise<Product> {
    return await prisma.product.create({ data });
  }

  static async update(
    id: number,
    data: {
      name?: string;
      description?: string;
      price?: number;
      stock?: number;
    },
  ): Promise<Product> {
    await this.getById(id);
    return await prisma.product.update({ where: { id }, data });
  }

  static async delete(id: number): Promise<Product> {
    await this.getById(id);
    return await prisma.product.delete({ where: { id } });
  }

  static async search(name?: string, maxPrice?: number): Promise<Product[]> {
    const where: Prisma.ProductWhereInput = {};
    if (name) where.name = { contains: name };
    if (maxPrice) where.price = { lte: maxPrice };
    return await prisma.product.findMany({ where });
  }
}
