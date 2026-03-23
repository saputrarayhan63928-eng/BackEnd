import { type Request, type Response } from 'express';
import * as CategoryService from '../services/category.service';
import { asyncHandler } from '../utils/async.handler';
import { successResponse } from '../utils/response';

export const listCategories = asyncHandler(async (_req: Request, res: Response) => {
  const categories = await CategoryService.getAllCategories();
  return successResponse(res, 'Daftar Kategori', categories);
});

export const addCategory = asyncHandler(async (req: Request, res: Response) => {
  // Asumsi req.body.name sudah divalidasi
  const category = await CategoryService.createCategory(req.body.name);
  return successResponse(res, 'Kategori berhasil dibuat', category, null, 201);
});