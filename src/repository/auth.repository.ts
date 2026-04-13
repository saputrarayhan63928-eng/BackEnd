import prisma from "../utils/prisma";

export class AuthRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) {
    return prisma.user.create({
      data,
    });
  }
}
