import { randomUUID } from "crypto";
import type { AuthRole } from "../services/auth.service";
import prisma from "../utils/prisma";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: AuthRole;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class AuthRepository {
  async findByEmail(email: string) {
    const users = await prisma.$queryRaw<AuthUser[]>`
      SELECT
        "id",
        "name",
        "email",
        "password",
        CAST("role" AS text) AS "role",
        "createdAt",
        "updatedAt",
        "deletedAt"
      FROM "users"
      WHERE "email" = ${email}
      LIMIT 1
    `;

    return users[0] ?? null;
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
    role: AuthRole;
  }) {
    const users = await prisma.$queryRaw<AuthUser[]>`
      INSERT INTO "users" (
        "id",
        "name",
        "email",
        "password",
        "role",
        "updatedAt"
      )
      VALUES (
        ${randomUUID()},
        ${data.name},
        ${data.email},
        ${data.password},
        CAST(${data.role} AS "Role"),
        CURRENT_TIMESTAMP
      )
      RETURNING
        "id",
        "name",
        "email",
        "password",
        CAST("role" AS text) AS "role",
        "createdAt",
        "updatedAt",
        "deletedAt"
    `;

    const createdUser = users[0];

    if (!createdUser) {
      throw new Error("Gagal membuat user");
    }

    return createdUser;
  }
}
