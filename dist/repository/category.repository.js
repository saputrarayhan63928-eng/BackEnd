import prisma from "../utils/prisma.js";
export class CategoryRepository {
    async findAll(skip, take, where, orderBy) {
        return prisma.category.findMany({
            skip,
            take,
            where,
            orderBy,
            include: {
                products: true,
            },
        });
    }
    async countAll(where) {
        return prisma.category.count({ where });
    }
    async create(data) {
        return prisma.category.create({ data });
    }
}
//# sourceMappingURL=category.repository.js.map