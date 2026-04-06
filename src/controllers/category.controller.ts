import { type Request, type Response } from "express";
import * as CategoryService from "../services/category.service";
import { asyncHandler } from "../utils/async.handler";
import { successResponse } from "../utils/response";

export const listCategories = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const name = req.query.name as string | undefined;
  const sortBy = req.query.sortBy as string | undefined;
  const sortOrderValue = req.query.sortOrder as string | undefined;
  const sortOrder =
    sortOrderValue === "asc" || sortOrderValue === "desc"
      ? sortOrderValue
      : undefined;

  const params: {
    page: number;
    limit: number;
    search?: { name?: string };
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  } = { page, limit };

  if (name) params.search = { name };
  if (sortBy) params.sortBy = sortBy;
  if (sortOrder) params.sortOrder = sortOrder;

  const result = await CategoryService.getAllCategories(params);

  return successResponse(res, "Daftar Kategori", result.categories, {
    page: result.currentPage,
    limit,
    total: result.totalItems,
  });
});

export const addCategory = asyncHandler(async (req: Request, res: Response) => {
  // Asumsi req.body.name sudah divalidasi
  const category = await CategoryService.createCategory(req.body.name);
  return successResponse(res, "Kategori berhasil dibuat", category, null, 201);
});
