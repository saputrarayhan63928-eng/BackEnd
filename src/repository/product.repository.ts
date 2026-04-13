import prisma from "../utils/prisma";
// import type { Product, Prisma } from "@prisma/client";
import type { Prisma } from "@prisma/client";
import {
 type IProduct,
   type ICreateProduct,
  type IUpdateProduct,
} from "../models/product.mode";
// import type { promises } from "node:dns";

export const findAll = async (
  skip: number,
  take: number,
  where: Prisma.ProductWhereInput,
  orderBy: Prisma.ProductOrderByWithRelationInput,
) => {
  return await prisma.product.findMany({
    skip,
    take,
    where,
    orderBy,
    include: { category: true }, // Relation selalu di repo atau service sesuai kebutuhan
  });
};

export const countAll = async (where: Prisma.ProductWhereInput) => {
  return await prisma.product.count({ where });
};

export const findById = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id, deletedAt: null },
    include: { category: true },
  });
};

export const create = async (data: Prisma.ProductCreateInput) => {
  return await prisma.product.create({ data });
};

export const update = async (id: number, data: Prisma.ProductUpdateInput) => {
  return await prisma.product.update({
    where: { id },
    data,
  });
};

export const softDelete = async (id: number) => {
  return await prisma.product.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
};

export class ProductRepository {
  // Simulasi database (ganti dengan real DB connection)
  private products: IProduct[] = [];
  private currentId = 1;

  async findAll(): Promise<IProduct[]> {
    return this.products;
  }

  async findById(id: number): Promise<IProduct | undefined> {
    return this.products.find((p) => p.id === id);
  }

  async create(data: ICreateProduct): Promise<IProduct> {
    const newProduct: IProduct = {
      id: this.currentId++,
      ...data,
      createdAt: new Date(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async update(id: number, data: IUpdateProduct): Promise<IProduct | null> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    this.products[index] = {
      ...this.products[index],
      ...data,
    };
    return this.products[index];
  }

  async delete(id: number): Promise<boolean> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return false;

    this.products.splice(index, 1);
    return true;
  }
}
