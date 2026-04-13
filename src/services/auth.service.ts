import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { AuthRepository } from "../repository/auth.repository";

const JWT_SECRET = process.env.JWT_SECRET || "secret_kunci_rahasia";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export class AuthService {
  constructor(private readonly repository: AuthRepository) {}

  async register(data: RegisterInput) {
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

  async login(data: LoginInput) {
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
