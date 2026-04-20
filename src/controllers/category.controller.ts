import type { NextFunction, Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { successResponse } from "../utils/response";

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  listCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page ?? req.body.page) || 1;
      const limit = Number(req.query.limit ?? req.body.limit) || 10;
      const name = (req.query.name ?? req.body.search?.name ?? req.body.name) as
        | string
        | undefined;
      const sortBy = (req.query.sortBy ?? req.body.sortBy) as string | undefined;
      const sortOrderValue = (req.query.sortOrder ??
        req.body.sortOrder) as string | undefined;
      const sortOrder =
        sortOrderValue === "asc" || sortOrderValue === "desc"
          ? sortOrderValue
          : undefined;

      const result = await this.categoryService.getAllCategories({
        page,
        limit,
        ...(name ? { search: { name } } : {}),
        ...(sortBy ? { sortBy } : {}),
        ...(sortOrder ? { sortOrder } : {}),
      });

      return successResponse(res, "Daftar Kategori", result.categories, {
        page: result.currentPage,
        limit,
        total: result.totalItems,
      });
    } catch (error) {
      next(error);
    }
  };

  addCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await this.categoryService.createCategory(req.body.name);
      return successResponse(res, "Kategori berhasil dibuat", category, null, 201);
    } catch (error) {
      next(error);
    }
  };
}
