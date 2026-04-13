import type { Prisma } from "@prisma/client";
interface FindAllParams {
    page: number;
    limit: number;
    search?: {
        name?: string;
    };
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
export declare const getAllCategories: (params: FindAllParams) => Promise<{
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
export declare const createCategory: (name: string) => Promise<{
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
}>;
export {};
//# sourceMappingURL=category.service.d.ts.map