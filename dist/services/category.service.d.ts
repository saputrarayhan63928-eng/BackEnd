import type { Prisma } from "@prisma/client";
import { CategoryRepository } from "../repository/category.repository";
export interface FindAllCategoriesParams {
    page: number;
    limit: number;
    search?: {
        name?: string;
    };
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
export declare class CategoryService {
    private readonly repository;
    constructor(repository: CategoryRepository);
    getAllCategories(params: FindAllCategoriesParams): Promise<{
        categories: ({
            products: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                price: Prisma.Decimal;
                stock: number;
                image: string;
                categoryId: number | null;
                deletedAt: Date | null;
            }[];
        } & {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
        })[];
        totalItems: number;
        totalPages: number;
        currentPage: number;
    }>;
    createCategory(name: string): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
//# sourceMappingURL=category.service.d.ts.map