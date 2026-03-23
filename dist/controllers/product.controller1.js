import {} from 'express';
import { ProductService } from '../services/product.service';
import { asyncHandler } from '../utils/async.handler';
import { successResponse } from '../utils/response';
export const getAllProducts = asyncHandler(async (_req, res) => {
    const products = await ProductService.getAll();
    return successResponse(res, 'Daftar produk', products);
});
export const getProductById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const product = await ProductService.getById(id);
    return successResponse(res, 'Produk ditemukan', product);
});
export const createProduct = asyncHandler(async (req, res) => {
    const product = await ProductService.create(req.body);
    return successResponse(res, 'Produk berhasil ditambahkan', product, null, 201);
});
export const updateProduct = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const product = await ProductService.update(id, req.body);
    return successResponse(res, 'Produk berhasil diupdate', product);
});
export const deleteProduct = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const product = await ProductService.delete(id);
    return successResponse(res, 'Produk berhasil dihapus', product);
});
export const searchProducts = asyncHandler(async (req, res) => {
    const { name, max_price } = req.query;
    const products = await ProductService.search(name, max_price ? Number(max_price) : undefined);
    return successResponse(res, 'Hasil pencarian', products);
});
//# sourceMappingURL=product.controller1.js.map