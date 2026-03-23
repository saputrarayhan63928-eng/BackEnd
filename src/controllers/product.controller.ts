import { type Request, type Response } from 'express';
import { ProductService } from '../services/product.service';
import { asyncHandler } from '../utils/async.handler';
import { successResponse } from '../utils/response';

export const index = asyncHandler(async (_req: Request, res: Response) => {
  const products = await ProductService.getAll();
  return successResponse(res, 'List Products', products);
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const product = await ProductService.create({
    ...req.body,
    price: Number(req.body.price),
    stock: Number(req.body.stock),
  });

  return successResponse(res, 'Product created', product, null, 201);
});

export const show = asyncHandler(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = await ProductService.getById(id);

  return successResponse(res, 'Product detail', product);
});
