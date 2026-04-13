import { ProductController } from "./product.controller";
import { ProductRepository } from "../repository/product.repository";
import { ProductService } from "../services/product.service";

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

export const getAllProducts = productController.getProducts;
export const getProductById = productController.getProduct;
export const create = productController.createProduct;
export const show = productController.getProduct;
export const createProduct = productController.createProduct;
export const updateProduct = productController.updateProduct;
export const deleteProduct = productController.deleteProduct;
