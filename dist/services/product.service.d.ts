import type { Prisma } from "@prisma/client";
import { ProductRepository } from "../repository/product.repository";
export interface FindAllProductsParams {
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
    private readonly repository;
    constructor(repository: ProductRepository);
    getAllProducts(params: FindAllProductsParams): Promise<{
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
    getProductById(id: number): Promise<{
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
    }>;
    createProduct(data: {
        name: string;
        description?: string;
        price: number;
        stock?: number;
        image: string;
        categoryId?: number;
    }): Promise<{
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
    }>;
    updateProduct(id: number, data: {
        name?: string;
        description?: string;
        price?: number;
        stock?: number;
        image?: string;
        categoryId?: number | null;
    }): Promise<{
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
    }>;
    deleteProduct(id: number): Promise<{
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
    }>;
    execute(): Promise<{
        overview: Prisma.GetProductAggregateType<{
            _count: {
                id: true;
            };
            _avg: {
                price: true;
            };
            _sum: {
                stock: true;
            };
            _min: {
                price: true;
            };
            _max: {
                price: true;
            };
        }>;
        byCategory: (Prisma.PickEnumerable<Prisma.ProductGroupByOutputType, "categoryId"[]> & {
            _count: {
                id: number;
            };
            _avg: {
                price: Prisma.Decimal | null;
            };
        })[];
    }>;
}
//# sourceMappingURL=product.service.d.ts.map