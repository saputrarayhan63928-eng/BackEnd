import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { AuthRepository } from "../repository/auth.repository";

const JWT_SECRET = process.env.JWT_SECRET || "secret_kunci_rahasia";
export const AUTH_ROLES = ["ADMIN", "MEMBER"] as const;
export type AuthRole = (typeof AUTH_ROLES)[number];

const normalizeRole = (role?: string): AuthRole => {
  if (!role) {
    return "MEMBER";
  }

  const normalizedRole = role.trim().toUpperCase();

  if ((AUTH_ROLES as readonly string[]).includes(normalizedRole)) {
    return normalizedRole as AuthRole;
  }

  throw new Error(`Role tidak valid. Gunakan salah satu: ${AUTH_ROLES.join(" atau ")}`);
};

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
    const name = data.name?.trim();
    const email = data.email?.trim().toLowerCase();
    const password = data.password?.trim();

    if (!name || !email || !password) {
      throw new Error("Nama, email, dan password wajib diisi");
    }

    const existingUser = await this.repository.findByEmail(email);

    if (existingUser) {
      throw new Error("Email sudah terdaftar");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.repository.create({
      name,
      email,
      password: hashedPassword,
      role: normalizeRole(data.role),
    });
  }

  async login(data: LoginInput) {
    const email = data.email?.trim().toLowerCase();
    const password = data.password?.trim();

    if (!email || !password) {
      throw new Error("Email dan password wajib diisi");
    }

    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new Error("Email atau Password salah");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error("Email atau Password salah");
    }

    const token = Jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return { user, token };
  }
}
