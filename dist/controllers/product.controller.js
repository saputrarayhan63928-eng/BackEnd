import {} from 'express';
import { ProductService } from '../services/product.service';
import { asyncHandler } from '../utils/async.handler';
import { successResponse } from '../utils/response';
export const index = asyncHandler(async (_req, res) => {
    const products = await ProductService.getAll();
    return successResponse(res, 'List Products', products);
});
export const create = asyncHandler(async (req, res) => {
    const product = await ProductService.create({
        ...req.body,
        price: Number(req.body.price),
        stock: Number(req.body.stock),
    });
    return successResponse(res, 'Product created', product, null, 201);
});
export const show = asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const product = await ProductService.getById(id);
    return successResponse(res, 'Product detail', product);
});
//# sourceMappingURL=product.controller.js.map