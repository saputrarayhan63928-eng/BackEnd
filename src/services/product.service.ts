import prisma from "../utils/prisma";
import type { Prisma, Product } from "@prisma/client";

export class ProductService {
  static async getAll(): Promise<Product[]> {
    return prisma.product.findMany({
      where: { deletedAt: null },
    });
  }

  static async getById(id: number): Promise<Product> {
    const product = await prisma.product.findFirst({
      where: { id, deletedAt: null },
    });

    if (!product) {
      throw new Error("Produk tidak ditemukan");
    }

    return product;
  }

  static async create(data: {
    name: string;
    description?: string;
    price: number;
    stock: number;
    categoryId?: number;
  }): Promise<Product> {
    return prisma.product.create({
      data,
    });
  }

  static async update(
    id: number,
    data: {
      name?: string;
      description?: string;
      price?: number;
      stock?: number;
      categoryId?: number;
    },
  ): Promise<Product> {
    await this.getById(id);

    return prisma.product.update({
      where: { id },
      data,
    });
  }

  static async delete(id: number): Promise<Product> {
    await this.getById(id);

    return prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  static async search(name?: string, maxPrice?: number): Promise<Product[]> {
    const where: Prisma.ProductWhereInput = {
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
