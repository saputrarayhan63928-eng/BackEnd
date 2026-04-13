import type { Prisma } from "@prisma/client";
import prisma from "../utils/prisma";

export class ProductRepository {
  async findAll(
    skip: number,
    take: number,
    where: Prisma.ProductWhereInput,
    orderBy: Prisma.ProductOrderByWithRelationInput,
  ) {
    return prisma.product.findMany({
      skip,
      take,
      where,
      orderBy,
      include: { category: true },
    });
  }

  async countAll(where: Prisma.ProductWhereInput) {
    return prisma.product.count({ where });
  }

  async findById(id: number) {
    return prisma.product.findFirst({
      where: { id, deletedAt: null },
      include: { category: true },
    });
  }

  async create(data: Prisma.ProductCreateInput) {
    return prisma.product.create({
      data,
      include: { category: true },
    });
  }

  async update(id: number, data: Prisma.ProductUpdateInput) {
    return prisma.product.update({
      where: { id },
      data,
      include: { category: true },
    });
  }

  async softDelete(id: number) {
    return prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
