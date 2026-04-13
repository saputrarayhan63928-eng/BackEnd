import { ProductRepository } from "../repository/product.repository";
import type { Prisma, Product } from "@prisma/client";
import { type IProduct, type ICreateProduct, type IUpdateProduct } from "../models/product.mode";
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
export declare class ProductServiceV2 {
    private repository;
    constructor(repository: ProductRepository);
    getAllProducts(): Promise<IProduct[]>;
    getProductById(id: number): Promise<IProduct>;
    createProduct(data: ICreateProduct): Promise<IProduct>;
    updateProduct(id: number, data: IUpdateProduct): Promise<IProduct>;
    deleteProduct(id: number): Promise<void>;
    checkStock(id: number): Promise<boolean>;
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
    static create(data: any): Promise<Product>;
    static update(id: number, data: any): Promise<Product>;
    static delete(id: number): Promise<Product>;
}
export {};
//# sourceMappingURL=product.service.d.ts.map