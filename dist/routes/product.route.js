import { Router } from "express";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct,
// searchProducts,
 } from "../controllers/product.controller";
import { validate, createProductValidation, getProductByIdValidation, } from "../middlewares/product.validation";
import { upload } from "../middlewares/upload.middleware";
import { authenticate } from "../middlewares/auth.middleware";
const router = Router();
router.get("/", getAllProducts);
// router.get("/search", searchProducts); // Route search harus sebelum :id
router.get("/:id", validate(getProductByIdValidation), getProductById);
router.post('/', authenticate, upload.single('image'), // Handle file upload sebelum controller
validate(createProductValidation), // Validasi body (perl penyesuaian untuk form-data)
createProduct);
router.put("/:id", validate(createProductValidation), updateProduct);
router.delete("/:id", validate(getProductByIdValidation), deleteProduct);
export default router;
//# sourceMappingURL=product.route.js.map