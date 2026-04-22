import { randomUUID } from "crypto";
import prisma from "../utils/prisma.js";
export class AuthRepository {
    async findByEmail(email) {
        const users = await prisma.$queryRaw `
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
    async create(data) {
        const users = await prisma.$queryRaw `
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
//# sourceMappingURL=auth.repository.js.map