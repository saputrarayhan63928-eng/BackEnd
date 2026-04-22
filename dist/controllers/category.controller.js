import { CategoryService } from "../services/category.service.js";
import { successResponse } from "../utils/response.js";
export class CategoryController {
    categoryService;
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    listCategories = async (req, res, next) => {
        try {
            const page = Number(req.query.page ?? req.body.page) || 1;
            const limit = Number(req.query.limit ?? req.body.limit) || 10;
            const name = (req.query.name ?? req.body.search?.name ?? req.body.name);
            const sortBy = (req.query.sortBy ?? req.body.sortBy);
            const sortOrderValue = (req.query.sortOrder ??
                req.body.sortOrder);
            const sortOrder = sortOrderValue === "asc" || sortOrderValue === "desc"
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
        }
        catch (error) {
            next(error);
        }
    };
    addCategory = async (req, res, next) => {
        try {
            const category = await this.categoryService.createCategory(req.body.name);
            return successResponse(res, "Kategori berhasil dibuat", category, null, 201);
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=category.controller.js.map