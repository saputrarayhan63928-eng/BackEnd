import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { AuthRepository } from "../repository/auth.repository";
const JWT_SECRET = process.env.JWT_SECRET || "secret_kunci_rahasia";
export class AuthService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async register(data) {
        const existingUser = await this.repository.findByEmail(data.email);
        if (existingUser) {
            throw new Error("Email sudah terdaftar");
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.repository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role || "USER",
        });
    }
    async login(data) {
        const user = await this.repository.findByEmail(data.email);
        if (!user) {
            throw new Error("Email atau Password salah");
        }
        const isValid = await bcrypt.compare(data.password, user.password);
        if (!isValid) {
            throw new Error("Email atau Password salah");
        }
        const token = Jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
            expiresIn: "1h",
        });
        return { user, token };
    }
}
//# sourceMappingURL=auth.service.js.map