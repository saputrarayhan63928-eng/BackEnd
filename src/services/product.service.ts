import { countAll, findAll,create, update, softDelete } from "../repository/product.repository";
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

    const sortCriteria: Prisma.ProductOrderByWithRelationInput = sortBy ? {[ sortBy] : sortOrder || "desc"} : {createdAt: "desc"}

    //  Ambil data dgn pagination and sorting
    const products = await findAll(skip,limit,whereClause,sortCriteria)

    // hitung total data (untuk metadata pagination)
    const totalItems = await countAll(whereClause)

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

  static async create(data: any): Promise<Product> {
    if(data.stock < 0) throw new Error ('Stock Tidak boleh Negatif')
    if(data.price < 0 ) throw new Error ('Stock Tidak boleh Negatif')
      return await create(data)
  }

  static async update(
    id: number,
    data: any,
  ): Promise<Product> {
    await this.getById(id);

    if(data.stock < 0) throw new Error ('Stock Tidak boleh Negatif')
    if(data.price < 0 ) throw new Error ('Stock Tidak boleh Negatif')

      return await update(id,data)
  }

  static async delete(id: number): Promise<Product> {
    await this.getById(id);

    return softDelete(id)
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
