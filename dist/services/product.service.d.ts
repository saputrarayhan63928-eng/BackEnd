import type { Prisma, Product } from "@prisma/client";
interface FindAllParams {
    page: number;
    limit: number;
    search?: {
        name?: string;
        maxPrice?: number;
    };
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}
export declare class ProductService {
    static getAll(params: FindAllParams): Promise<{
        products: ({
            category: {
                name: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
            } | null;
        } & {
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
        })[];
        totalItems: number;
        totalPages: number;
        currentPage: number;
    }>;
    static getById(id: number): Promise<Product>;
    static create(data: {
        name: string;
        description?: string;
        price: number;
        stock: number;
        categoryId?: number;
        image: string;
    }): Promise<Product>;
    static update(id: number, data: {
        name?: string;
        description?: string;
        price?: number;
        stock?: number;
        categoryId?: number;
        image?: string;
    }): Promise<Product>;
    static delete(id: number): Promise<Product>;
}
export {};
//# sourceMappingURL=product.service.d.ts.map