import prisma from "../utils/prisma";
import type { Prisma } from "@prisma/client";

interface FindAllParams {
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

export const getAllCategories = async (params: FindAllParams) => {
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

  const categories = await prisma.category.findMany({
    skip,
    take: limit,
    where: whereClause,
    orderBy: { [orderByField]: sortOrder || "desc" },
    include: {
      products: true,
    },
  });

  const totalItems = await prisma.category.count({
    where: whereClause,
  });

  return {
    categories,
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
    currentPage: page,
  };
};

export const createCategory = async (name: string) => {
  return await prisma.category.create({
    data: { name }
  });
};
