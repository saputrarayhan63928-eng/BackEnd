import { Router } from "express";
// import {
//   getAllProducts,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   // searchProducts,
// } from "../controllers/product.controller";
// import {
//   validate,
//   createProductValidation,
//   getProductByIdValidation,
// } from "../middlewares/product.validation";

// import { upload } from "../middlewares/upload.middleware";
// import { authenticate } from "../middlewares/auth.middleware";


import { ProductControllerV2 } from "../controllers/product.controller";
import { ProductRepository } from "../repository/product.repository";
import { ProductServiceV2 } from "../services/product.service";
const router = Router();

const productRepository = new ProductRepository()
const productServiceV2 = new ProductServiceV2(productRepository)
const productControler = new ProductControllerV2(productServiceV2) 
// router.get("/", getAllProducts);
// // router.get("/search", searchProducts); // Route search harus sebelum :id
// router.get("/:id", validate(getProductByIdValidation), getProductById);
// router.post('/', 
//   authenticate,
//   upload.single('image'), // Handle file upload sebelum controller
//   validate(createProductValidation), // Validasi body (perl penyesuaian untuk form-data)
//   createProduct
// )
// router.put("/:id", validate(createProductValidation), updateProduct);
// router.delete("/:id", validate(getProductByIdValidation), deleteProduct);

router.get('/products', productControler.getProducts);
router.get('/products/:id', productControler.getProduct)
router.post('/products', productControler.createProduct)
router.put('/products/:id', productControler.updateProduct)
router.delete('/prodcuts/:id', productControler.deleteProduct)


export default router;
