import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts
} from '../controllers/product.controller1';
import { 
  validate, 
  createProductValidation, 
  getProductByIdValidation 
} from '../middlewares/product.validation';

const router = Router();

router.get('/', getAllProducts);
router.get('/search', searchProducts); // Route search harus sebelum :id
router.get('/:id', validate(getProductByIdValidation), getProductById);
router.post('/', validate(createProductValidation), createProduct);
router.put('/:id', validate(createProductValidation), updateProduct);
router.delete('/:id', validate(getProductByIdValidation), deleteProduct);

export default router;