import type { Prisma } from "@prisma/client";
import { CategoryRepository } from "../repository/category.repository";

export interface FindAllCategoriesParams {
  page: number;
  limit: number;
  search?: {
    name?: string;
  };
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

const allowedSortFields = ["id", "name", "createdAt", "updatedAt"] as const;
type AllowedSortField = (typeof allowedSortFields)[number];

export class CategoryService {
  constructor(private readonly repository: CategoryRepository) {}

  async getAllCategories(params: FindAllCategoriesParams) {
    const { page, limit, search, sortBy, sortOrder } = params;
    const skip = (page - 1) * limit;
    const orderByField: AllowedSortField = allowedSortFields.includes(
      sortBy as AllowedSortField,
    )
      ? (sortBy as AllowedSortField)
      : "createdAt";

    const whereClause: Prisma.CategoryWhereInput = {};

    if (search?.name) {
      whereClause.name = {
        contains: search.name,
        mode: "insensitive",
      };
    }

    const categories = await this.repository.findAll(skip, limit, whereClause, {
      [orderByField]: sortOrder || "desc",
    });
    const totalItems = await this.repository.countAll(whereClause);

    return {
      categories,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    };
  }

  async createCategory(name: string) {
    if (!name.trim()) {
      throw new Error("Nama kategori wajib diisi");
    }

    return this.repository.create({ name });
  }
}
