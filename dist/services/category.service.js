import prisma from "../utils/prisma";
export const getAllCategories = async () => {
    return await prisma.category.findMany();
};
export const createCategory = async (name) => {
    return await prisma.category.create({
        data: { name }
    });
};
//# sourceMappingURL=category.service.js.map