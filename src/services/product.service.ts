import prisma from "../utils/prisma";
import type { Prisma, Product } from "@prisma/client";

interface FindAllParams {
  page: number;
  limit: number;
  search?: {
    name?: string,
    maxPrice?:number
  };
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

const allowedSortFields = [
  "id",
  "name",
  "price",
  "stock",
  "createdAt",
  "updatedAt",
] as const;

type AllowedSortField = (typeof allowedSortFields)[number];

export class ProductService {
  static async getAll(params: FindAllParams) {
    const { page, limit, search, sortBy, sortOrder } = params;
    const orderByField: AllowedSortField = allowedSortFields.includes(
      sortBy as AllowedSortField,
    )
      ? (sortBy as AllowedSortField)
      : "createdAt";

    const skip = (page - 1) * limit;

    // 1. Buat Filter (Where Clause)
    const whereClause: Prisma.ProductWhereInput = {
      deletedAt: null, // Selalu filter yang belum dihapus (soft delete)
    };

    if(search?.name){
      whereClause.name = {contains: search.name, mode: 'insensitive'}
    }
    if(search?.maxPrice){
      whereClause.price = {
        lte: search.maxPrice
      }
    }

    //  Ambil data dgn pagination and sorting
    const products = await prisma.product.findMany({
      skip: skip,
      take: limit,
      where: whereClause,
      // gunakan array untuk orderBy agar dinamis
      orderBy: { [orderByField]: sortOrder || "desc" },
      include: {
        category: true
      }
    })

    // hitung total data (untuk metadata pagination)
    const totalItems = await prisma.product.count({
      where: whereClause
    })

    return {
      products,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page
    }
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
    image: string;
  }): Promise<Product> {
    const { categoryId, ...productData } = data;

    return prisma.product.create({
      data: {
        ...productData,
        ...(categoryId
          ? {
              category: {
                connect: { id: categoryId },
              },
            }
          : {}),
      },
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
      image?: string;
    },
  ): Promise<Product> {
    await this.getById(id);

    const { categoryId, ...productData } = data;

    return prisma.product.update({
      where: { id },
      data: {
        ...productData,
        ...(categoryId !== undefined
          ? {
              category: categoryId
                ? {
                    connect: { id: categoryId },
                  }
                : {
                    disconnect: true,
                  },
            }
          : {}),
      },
    });
  }

  static async delete(id: number): Promise<Product> {
    await this.getById(id);

    return prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  // static async search(name?: string, maxPrice?: number): Promise<Product[]> {
  //   const where: Prisma.ProductWhereInput = {
  //     deletedAt: null,
  //   };

  //   if (name) {
  //     where.name = { contains: name, mode: "insensitive" };
  //   }

  //   if (maxPrice !== undefined) {
  //     where.price = { lte: maxPrice };
  //   }

  //   return prisma.product.findMany({ where });
  // }
}
