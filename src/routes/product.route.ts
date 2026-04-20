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
 * /products:
 *   get:
 *     summary: Ambil semua daftar produk
 *     tags: [Products]
 *     parameters:
 *       - $ref: '#/components/parameters/ApiKeyHeader'
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Nomor halaman
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Jumlah data per halaman
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Cari produk berdasarkan nama
 *       - in: query
 *         name: max_price
 *         schema:
 *           type: integer
 *         description: Harga maksimal
 *     responses:
 *       200:
 *         description: Berhasil mengambil data
 */

router.get("/", productController.getProducts);
router.get("/stats", productController.getStats)
router.get("/:id", productController.getProduct);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export default router;
