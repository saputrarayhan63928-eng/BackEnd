import { ProductService } from "../services/product.service.js";
import { successResponse } from "../utils/response.js";
export class ProductController {
    productService;
    constructor(productService) {
        this.productService = productService;
    }
    getProducts = async (req, res, next) => {
        try {
            const body = req.body ?? {};
            const bodySearch = body.search ?? {};
            const page = Number(req.query.page ?? body.page) || 1;
            const limit = Number(req.query.limit ?? body.limit) || 10;
            const name = (req.query.name ?? bodySearch.name ?? body.name);
            const maxPriceValue = req.query.maxPrice ?? bodySearch.maxPrice ?? body.maxPrice;
            const sortBy = (req.query.sortBy ?? body.sortBy);
            const sortOrderValue = (req.query.sortOrder ??
                body.sortOrder);
            const sortOrder = sortOrderValue === "asc" || sortOrderValue === "desc"
                ? sortOrderValue
                : undefined;
            const result = await this.productService.getAllProducts({
                page,
                limit,
                ...(name || maxPriceValue !== undefined
                    ? {
                        search: {
                            ...(name ? { name } : {}),
                            ...(maxPriceValue !== undefined
                                ? { maxPrice: Number(maxPriceValue) }
                                : {}),
                        },
                    }
                    : {}),
                ...(sortBy ? { sortBy } : {}),
                ...(sortOrder ? { sortOrder } : {}),
            });
            return successResponse(res, "Daftar product berhasil diambil", result.products, {
                page: result.currentPage,
                limit,
                total: result.totalItems,
            });
        }
        catch (error) {
            next(error);
        }
    };
    getProduct = async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const product = await this.productService.getProductById(id);
            return successResponse(res, "Produk ditemukan", product);
        }
        catch (error) {
            next(error);
        }
    };
    createProduct = async (req, res, next) => {
        try {
            const file = req.file;
            const product = await this.productService.createProduct({
                name: req.body.name,
                price: Number(req.body.price),
                stock: req.body.stock !== undefined ? Number(req.body.stock) : 0,
                image: file ? `/public/uploads/${file.filename}` : req.body.image,
                ...(req.body.description !== undefined
                    ? { description: req.body.description }
                    : {}),
                ...(req.body.categoryId !== undefined
                    ? { categoryId: Number(req.body.categoryId) }
                    : {}),
            });
            return successResponse(res, "Produk berhasil ditambahkan", product, null, 201);
        }
        catch (error) {
            next(error);
        }
    };
    updateProduct = async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const product = await this.productService.updateProduct(id, {
                ...(req.body.name !== undefined ? { name: req.body.name } : {}),
                ...(req.body.description !== undefined
                    ? { description: req.body.description }
                    : {}),
                ...(req.body.price !== undefined ? { price: Number(req.body.price) } : {}),
                ...(req.body.stock !== undefined ? { stock: Number(req.body.stock) } : {}),
                ...(req.body.image !== undefined ? { image: req.body.image } : {}),
                ...(req.body.categoryId !== undefined
                    ? {
                        categoryId: req.body.categoryId === null || req.body.categoryId === ""
                            ? null
                            : Number(req.body.categoryId),
                    }
                    : {}),
            });
            return successResponse(res, "Produk berhasil diupdate", product);
        }
        catch (error) {
            next(error);
        }
    };
    deleteProduct = async (req, res, next) => {
        try {
            const id = Number(req.params.id);
            const product = await this.productService.deleteProduct(id);
            return successResponse(res, "Produk berhasil dihapus", product);
        }
        catch (error) {
            next(error);
        }
    };
    getStats = async (_req, res) => {
        const stats = await this.productService.execute();
        return successResponse(res, 'Statistik produk berhasil di ambil', stats);
    };
}
//# sourceMappingURL=product.controller.js.map