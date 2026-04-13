import type { Prisma } from "@prisma/client";
import prisma from "../utils/prisma";

export class CategoryRepository {
  async findAll(
    skip: number,
    take: number,
    where: Prisma.CategoryWhereInput,
    orderBy: Prisma.CategoryOrderByWithRelationInput,
  ) {
    return prisma.category.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        products: true,
      },
    });
  }

  async countAll(where: Prisma.CategoryWhereInput) {
    return prisma.category.count({ where });
  }

  async create(data: Prisma.CategoryCreateInput) {
    return prisma.category.create({ data });
  }
}
