import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
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
        url: "http://localhost:3000/api/v1",
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
