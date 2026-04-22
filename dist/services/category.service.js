import { CategoryRepository } from "../repository/category.repository.js";
const allowedSortFields = ["id", "name", "createdAt", "updatedAt"];
export class CategoryService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async getAllCategories(params) {
        const { page, limit, search, sortBy, sortOrder } = params;
        const skip = (page - 1) * limit;
        const orderByField = allowedSortFields.includes(sortBy)
            ? sortBy
            : "createdAt";
        const whereClause = {};
        if (search?.name) {
            whereClause.name = {
                contains: search.name,
                mode: "insensitive",
            };
        }
        const categories = await this.repository.findAll(skip, limit, whereClause, {
            [orderByField]: sortOrder || "desc",
        });
        const totalItems = await this.repository.countAll(whereClause);
        return {
            categories,
            totalItems,
            totalPages: Math.ceil(totalItems / limit),
            currentPage: page,
        };
    }
    async createCategory(name) {
        if (!name.trim()) {
            throw new Error("Nama kategori wajib diisi");
        }
        return this.repository.create({ name });
    }
}
//# sourceMappingURL=category.service.js.map