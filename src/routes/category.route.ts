import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { CategoryRepository } from "../repository/category.repository";
import { CategoryService } from "../services/category.service";

const router = Router();

const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Manajemen kategori produk
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Ambil daftar kategori
 *     tags: [Categories]
 *     parameters:
 *       - $ref: '#/components/parameters/ApiKeyHeader'
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Nomor halaman
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Jumlah data per halaman
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Cari kategori berdasarkan nama
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [id, name, createdAt, updatedAt]
 *         description: Field untuk sorting
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Urutan sorting
 *     responses:
 *       200:
 *         description: Daftar kategori berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Daftar Kategori
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       401:
 *         description: Header x-api-key tidak dikirim
 *   post:
 *     summary: Tambah kategori baru
 *     tags: [Categories]
 *     parameters:
 *       - $ref: '#/components/parameters/ApiKeyHeader'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Elektronik
 *     responses:
 *       201:
 *         description: Kategori berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Kategori berhasil dibuat
 *                 data:
 *                   $ref: '#/components/schemas/CategorySummary'
 *       400:
 *         description: Nama kategori tidak valid
 *       401:
 *         description: Header x-api-key tidak dikirim
 */

router.get("/", categoryController.listCategories);
router.post("/", categoryController.addCategory);

export default router;
