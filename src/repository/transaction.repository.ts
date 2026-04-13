import type { Prisma } from "@prisma/client";
import prisma from "../utils/prisma";

export class TransactionRepository {
  async findAll(
    skip: number,
    take: number,
    where: Prisma.TransactionWhereInput,
    orderBy: Prisma.TransactionOrderByWithRelationInput,
  ) {
    return prisma.transaction.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        user: true,
        item: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async countAll(where: Prisma.TransactionWhereInput) {
    return prisma.transaction.count({ where });
  }

  async findById(id: number) {
    return prisma.transaction.findUnique({
      where: { id },
      include: {
        user: true,
        item: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async executeInTransaction<T>(
    callback: (tx: Prisma.TransactionClient) => Promise<T>,
  ) {
    return prisma.$transaction(callback);
  }

  async findProductById(tx: Prisma.TransactionClient, productId: number) {
    return tx.product.findFirst({
      where: {
        id: productId,
        deletedAt: null,
      },
    });
  }

  async decrementProductStock(
    tx: Prisma.TransactionClient,
    productId: number,
    quantity: number,
  ) {
    return tx.product.update({
      where: { id: productId },
      data: {
        stock: {
          decrement: quantity,
        },
      },
    });
  }

  async createTransaction(
    tx: Prisma.TransactionClient,
    userId: number,
    total: number,
    items: Prisma.TransactionItemCreateWithoutTransactionInput[],
  ) {
    return tx.transaction.create({
      data: {
        userId,
        total,
        item: {
          create: items,
        },
      },
      include: {
        item: {
          include: {
            product: true,
          },
        },
      },
    });
  }
}
