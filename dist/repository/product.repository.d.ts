import type { Prisma } from "@prisma/client";
import { type IProduct, type ICreateProduct, type IUpdateProduct } from "../models/product.mode";
export declare const findAll: (skip: number, take: number, where: Prisma.ProductWhereInput, orderBy: Prisma.ProductOrderByWithRelationInput) => Promise<({
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
})[]>;
export declare const countAll: (where: Prisma.ProductWhereInput) => Promise<number>;
export declare const findById: (id: number) => Promise<({
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
}) | null>;
export declare const create: (data: Prisma.ProductCreateInput) => Promise<{
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
export declare const update: (id: number, data: Prisma.ProductUpdateInput) => Promise<{
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
export declare const softDelete: (id: number) => Promise<{
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
export declare class ProductRepository {
    private products;
    private currentId;
    findAll(): Promise<IProduct[]>;
    findById(id: number): Promise<IProduct | undefined>;
    create(data: ICreateProduct): Promise<IProduct>;
    update(id: number, data: IUpdateProduct): Promise<IProduct | null>;
    delete(id: number): Promise<boolean>;
}
//# sourceMappingURL=product.repository.d.ts.map