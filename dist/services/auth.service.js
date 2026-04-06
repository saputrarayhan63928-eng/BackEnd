import prisma from "../utils/prisma";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "secret_kunci_rahasia";
export const register = async (data) => {
    const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
    });
    if (existingUser) {
        throw new Error("Email sudah terdaftar");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role || "USER",
        },
    });
};
export const login = async (data) => {
    const user = await prisma.user.findUnique({
        where: { email: data.email },
    });
    if (!user) {
        throw new Error("Email atau Password salah");
    }
    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
        throw new Error("Email atau Password salah");
    }
    const token = Jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
    return { user, token };
};
//# sourceMappingURL=auth.service.js.map