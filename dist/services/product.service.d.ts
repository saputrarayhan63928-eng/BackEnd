import type { Product } from "@prisma/client";
export declare class ProductService {
    static getAll(): Promise<Product[]>;
    static getById(id: number): Promise<Product>;
    static create(data: {
        name: string;
        description?: string;
        price: number;
        stock: number;
        categoryId?: number;
    }): Promise<Product>;
    static update(id: number, data: {
        name?: string;
        description?: string;
        price?: number;
        stock?: number;
        categoryId?: number;
    }): Promise<Product>;
    static delete(id: number): Promise<Product>;
    static search(name?: string, maxPrice?: number): Promise<Product[]>;
}
//# sourceMappingURL=product.service.d.ts.map