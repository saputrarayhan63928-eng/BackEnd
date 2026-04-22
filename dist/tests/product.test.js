jest.mock("../utils/prisma", () => ({
    __esModule: true,
    default: {
        product: {
            findMany: jest.fn(),
            count: jest.fn(),
            findFirst: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            aggregate: jest.fn(),
            groupBy: jest.fn(),
        },
    },
}));
import request from "supertest";
import app from "../app.js";
import prisma from "../utils/prisma.js";
const mockedPrisma = prisma;
describe("GET /api/v1/products", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should return 401 if x-api-key header is not provided", async () => {
        const res = await request(app).get("/api/v1/products");
        expect(res.statusCode).toBe(401);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe("Kirim header X-API-Key");
    });
    it("should return 200 and list of products when x-api-key header is provided", async () => {
        mockedPrisma.product.findMany.mockResolvedValue([
            {
                id: 1,
                name: "Mouse Wireless",
                description: "Mouse untuk testing",
                price: 150000,
                stock: 12,
                image: "/public/uploads/mouse.jpg",
                categoryId: 1,
                category: {
                    id: 1,
                    name: "Aksesoris",
                    createdAt: new Date("2026-04-21T00:00:00.000Z"),
                    updatedAt: new Date("2026-04-21T00:00:00.000Z"),
                },
                createdAt: new Date("2026-04-21T00:00:00.000Z"),
                updatedAt: new Date("2026-04-21T00:00:00.000Z"),
                deletedAt: null,
            },
        ]);
        mockedPrisma.product.count.mockResolvedValue(1);
        const res = await request(app)
            .get("/api/v1/products")
            .set("X-API-Key", "test-api-key");
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe("Daftar product berhasil diambil");
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.data).toHaveLength(1);
        expect(res.body.pagination).toEqual({
            page: 1,
            limit: 10,
            total: 1,
        });
    });
});
//# sourceMappingURL=product.test.js.map