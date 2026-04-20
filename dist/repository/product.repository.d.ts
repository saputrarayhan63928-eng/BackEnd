import type { Prisma } from "@prisma/client";
export declare class ProductRepository {
    findAll(skip: number, take: number, where: Prisma.ProductWhereInput, orderBy: Prisma.ProductOrderByWithRelationInput): Promise<({
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
    countAll(where: Prisma.ProductWhereInput): Promise<number>;
    findById(id: number): Promise<({
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
    create(data: Prisma.ProductCreateInput): Promise<{
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
    update(id: number, data: Prisma.ProductUpdateInput): Promise<{
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
    softDelete(id: number): Promise<{
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
    findComplex(categoryName: string, maxPrice: number): Promise<{
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
    }[]>;
    getStatistics(): Promise<Prisma.GetProductAggregateType<{
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
    }>>;
    getProductsByCategotyStats(): Promise<(Prisma.PickEnumerable<Prisma.ProductGroupByOutputType, "categoryId"[]> & {
        _count: {
            id: number;
        };
        _avg: {
            price: Prisma.Decimal | null;
        };
    })[]>;
}
//# sourceMappingURL=product.repository.d.ts.map