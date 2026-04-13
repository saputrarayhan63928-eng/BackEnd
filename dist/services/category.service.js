import prisma from "../utils/prisma";
const allowedSortFields = ["id", "name", "createdAt", "updatedAt"];
export const getAllCategories = async (params) => {
    const { page, limit, search, sortBy, sortOrder } = params;
    const skip = (page - 1) * limit;
    const orderByField = allowedSortFields.includes(sortBy)
        ? sortBy
        : "createdAt";
    const whereClause = {};
    if (search?.name) {
        whereClause.name = {
            contains: search.name,
            mode: "insensitive",
        };
    }
    const categories = await prisma.category.findMany({
        skip,
        take: limit,
        where: whereClause,
        orderBy: { [orderByField]: sortOrder || "desc" },
        include: {
            products: true,
        },
    });
    const totalItems = await prisma.category.count({
        where: whereClause,
    });
    return {
        categories,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
    };
};
export const createCategory = async (name) => {
    return await prisma.category.create({
        data: { name }
    });
};
//# sourceMappingURL=category.service.js.map