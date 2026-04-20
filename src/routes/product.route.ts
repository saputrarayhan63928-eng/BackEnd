import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { ProductRepository } from "../repository/product.repository";
import { ProductService } from "../services/product.service";

const router = Router();

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Manajemen produk
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Ambil semua daftar produk
 *     tags: [Products]
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
 *         description: Cari produk berdasarkan nama
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: integer
 *         description: Harga maksimal
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [id, name, price, stock, createdAt, updatedAt]
 *         description: Field untuk sorting
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Urutan sorting
 *     responses:
 *       200:
 *         description: Berhasil mengambil data
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
 *                   example: Daftar product berhasil diambil
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       401:
 *         description: Header x-api-key tidak dikirim
 *   post:
 *     summary: Tambah produk baru
 *     tags: [Products]
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
 *               - price
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mouse Wireless
 *               description:
 *                 type: string
 *                 example: Mouse ergonomis untuk kerja harian
 *               price:
 *                 type: number
 *                 example: 150000
 *               stock:
 *                 type: integer
 *                 example: 20
 *               image:
 *                 type: string
 *                 example: /public/uploads/mouse.jpg
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Produk berhasil ditambahkan
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
 *                   example: Produk berhasil ditambahkan
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Request body tidak valid
 *       401:
 *         description: Header x-api-key tidak dikirim
 */

/**
 * @swagger
 * /api/v1/products/stats:
 *   get:
 *     summary: Ambil statistik produk
 *     tags: [Products]
 *     parameters:
 *       - $ref: '#/components/parameters/ApiKeyHeader'
 *     responses:
 *       200:
 *         description: Statistik produk berhasil diambil
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
 *                   example: Statistik produk berhasil di ambil
 *                 data:
 *                   type: object
 *                   properties:
 *                     overview:
 *                       $ref: '#/components/schemas/ProductStatsOverview'
 *                     byCategory:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/ProductStatsByCategory'
 *       401:
 *         description: Header x-api-key tidak dikirim
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Ambil detail produk berdasarkan ID
 *     tags: [Products]
 *     parameters:
 *       - $ref: '#/components/parameters/ApiKeyHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID produk
 *     responses:
 *       200:
 *         description: Produk ditemukan
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
 *                   example: Produk ditemukan
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produk tidak ditemukan
 *       401:
 *         description: Header x-api-key tidak dikirim
 *   put:
 *     summary: Update produk berdasarkan ID
 *     tags: [Products]
 *     parameters:
 *       - $ref: '#/components/parameters/ApiKeyHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID produk
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mouse Wireless Pro
 *               description:
 *                 type: string
 *                 example: Mouse ergonomis versi terbaru
 *               price:
 *                 type: number
 *                 example: 175000
 *               stock:
 *                 type: integer
 *                 example: 15
 *               image:
 *                 type: string
 *                 example: /public/uploads/mouse-pro.jpg
 *               categoryId:
 *                 type: integer
 *                 nullable: true
 *                 example: 1
 *     responses:
 *       200:
 *         description: Produk berhasil diupdate
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
 *                   example: Produk berhasil diupdate
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Request body tidak valid
 *       404:
 *         description: Produk tidak ditemukan
 *       401:
 *         description: Header x-api-key tidak dikirim
 *   delete:
 *     summary: Hapus produk secara soft delete
 *     tags: [Products]
 *     parameters:
 *       - $ref: '#/components/parameters/ApiKeyHeader'
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID produk
 *     responses:
 *       200:
 *         description: Produk berhasil dihapus
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
 *                   example: Produk berhasil dihapus
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produk tidak ditemukan
 *       401:
 *         description: Header x-api-key tidak dikirim
 */

router.get("/", productController.getProducts);
router.get("/stats", productController.getStats)
router.get("/:id", productController.getProduct);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
