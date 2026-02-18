
import { type Request, type Response } from 'express';
import * as productService from '../services/product.service'; // Import semua fungsi
import { asyncHandler } from '../utils/async.handler';
import { successResponse } from '../utils/response';

export const index = asyncHandler(async (req: Request, res: Response) => {
  const products = await productService.getAllProducts();
  return successResponse(res, 'List Products', products);
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.createProduct({
    ...req.body,
    price: Number(req.body.price),
    stock: Number(req.body.stock)
  });
  return successResponse(res, 'Product created', product, null, 201);
});

export const show = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = await productService.getProductById(id);
  return successResponse(res, 'Product detail', product);
});

// ... implementasi update & delete serupa