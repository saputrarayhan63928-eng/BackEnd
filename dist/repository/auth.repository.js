import prisma from "../utils/prisma";
export class AuthRepository {
    async findByEmail(email) {
        return prisma.user.findUnique({
            where: { email },
        });
    }
    async create(data) {
        return prisma.user.create({
            data,
        });
    }
}
//# sourceMappingURL=auth.repository.js.map