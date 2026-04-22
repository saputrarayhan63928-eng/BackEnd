import swaggerJsdoc from "swagger-jsdoc";
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "E-Commerce API Documentation",
            version: "1.0.0",
            description: "Dokumentasi lengkap API E-Commerce",
            contact: {
                name: "Backend Developer",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Development Server",
            },
        ],
        components: {
            parameters: {
                ApiKeyHeader: {
                    name: "x-api-key",
                    in: "header",
                    required: true,
                    description: "API key wajib dikirim lewat header x-api-key",
                    schema: {
                        type: "string",
                    },
                },
            },
            schemas: {
                ErrorItem: {
                    type: "object",
                    properties: {
                        field: {
                            type: "string",
                            example: "email",
                        },
                        message: {
                            type: "string",
                            example: "Format email tidak valid",
                        },
                    },
                },
                Pagination: {
                    type: "object",
                    properties: {
                        page: {
                            type: "integer",
                            example: 1,
                        },
                        limit: {
                            type: "integer",
                            example: 10,
                        },
                        total: {
                            type: "integer",
                            example: 100,
                        },
                    },
                },
                CategorySummary: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            example: 1,
                        },
                        name: {
                            type: "string",
                            example: "Elektronik",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                        },
                    },
                },
                Product: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            example: 1,
                        },
                        name: {
                            type: "string",
                            example: "Mouse Wireless",
                        },
                        description: {
                            type: "string",
                            nullable: true,
                            example: "Mouse ergonomis untuk kerja harian",
                        },
                        price: {
                            type: "number",
                            example: 150000,
                        },
                        stock: {
                            type: "integer",
                            example: 20,
                        },
                        image: {
                            type: "string",
                            example: "/public/uploads/mouse.jpg",
                        },
                        categoryId: {
                            type: "integer",
                            nullable: true,
                            example: 1,
                        },
                        category: {
                            allOf: [
                                {
                                    $ref: "#/components/schemas/CategorySummary",
                                },
                            ],
                            nullable: true,
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                        },
                        deletedAt: {
                            type: "string",
                            format: "date-time",
                            nullable: true,
                        },
                    },
                },
                Category: {
                    allOf: [
                        {
                            $ref: "#/components/schemas/CategorySummary",
                        },
                        {
                            type: "object",
                            properties: {
                                products: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Product",
                                    },
                                },
                            },
                        },
                    ],
                },
                AuthUser: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            format: "uuid",
                        },
                        name: {
                            type: "string",
                            example: "John Doe",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "john@example.com",
                        },
                        role: {
                            type: "string",
                            enum: ["ADMIN", "MEMBER"],
                            example: "MEMBER",
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                        },
                        deletedAt: {
                            type: "string",
                            format: "date-time",
                            nullable: true,
                        },
                    },
                },
                TransactionItem: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            example: 1,
                        },
                        transactionId: {
                            type: "integer",
                            example: 1,
                        },
                        productId: {
                            type: "integer",
                            example: 1,
                        },
                        quantity: {
                            type: "integer",
                            example: 2,
                        },
                        priceAtTime: {
                            type: "number",
                            example: 150000,
                        },
                        product: {
                            $ref: "#/components/schemas/Product",
                        },
                    },
                },
                Transaction: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            example: 1,
                        },
                        userId: {
                            type: "string",
                            example: "74b1a2da-90b1-4676-9c15-7c42ebd442d4",
                        },
                        total: {
                            type: "number",
                            example: 300000,
                        },
                        user: {
                            $ref: "#/components/schemas/AuthUser",
                        },
                        item: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/TransactionItem",
                            },
                        },
                        createdAt: {
                            type: "string",
                            format: "date-time",
                        },
                        updatedAt: {
                            type: "string",
                            format: "date-time",
                        },
                        deletedAt: {
                            type: "string",
                            format: "date-time",
                            nullable: true,
                        },
                    },
                },
                ProductStatsOverview: {
                    type: "object",
                    properties: {
                        _count: {
                            type: "object",
                            properties: {
                                id: {
                                    type: "integer",
                                    example: 25,
                                },
                            },
                        },
                        _avg: {
                            type: "object",
                            properties: {
                                price: {
                                    type: "number",
                                    example: 150000,
                                },
                            },
                        },
                        _sum: {
                            type: "object",
                            properties: {
                                stock: {
                                    type: "integer",
                                    example: 300,
                                },
                            },
                        },
                        _min: {
                            type: "object",
                            properties: {
                                price: {
                                    type: "number",
                                    example: 50000,
                                },
                            },
                        },
                        _max: {
                            type: "object",
                            properties: {
                                price: {
                                    type: "number",
                                    example: 500000,
                                },
                            },
                        },
                    },
                },
                ProductStatsByCategory: {
                    type: "object",
                    properties: {
                        categoryId: {
                            type: "integer",
                            nullable: true,
                            example: 1,
                        },
                        _count: {
                            type: "object",
                            properties: {
                                id: {
                                    type: "integer",
                                    example: 10,
                                },
                            },
                        },
                        _avg: {
                            type: "object",
                            properties: {
                                price: {
                                    type: "number",
                                    example: 175000,
                                },
                            },
                        },
                    },
                },
            },
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    // PENTING: Tentukan file mana yang mengandung anotasi Swagger
    apis: ["./src/routes/*.ts"],
};
const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
//# sourceMappingURL=swagger.js.map