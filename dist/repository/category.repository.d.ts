import type { Prisma } from "@prisma/client";
export declare class CategoryRepository {
    findAll(skip: number, take: number, where: Prisma.CategoryWhereInput, orderBy: Prisma.CategoryOrderByWithRelationInput): Promise<({
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
    })[]>;
    countAll(where: Prisma.CategoryWhereInput): Promise<number>;
    create(data: Prisma.CategoryCreateInput): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
//# sourceMappingURL=category.repository.d.ts.map