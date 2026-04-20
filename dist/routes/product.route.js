import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { ProductRepository } from "../repository/product.repository";
import { ProductService } from "../services/product.service";
const router = Router();
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);
router.get("/", productController.getProducts);
router.get("/stats", productController.getStats);
router.get("/:id", productController.getProduct);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
export default router;
//# sourceMappingURL=product.route.js.map