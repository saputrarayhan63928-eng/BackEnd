import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { CategoryRepository } from "../repository/category.repository";
import { CategoryService } from "../services/category.service";
const router = Router();
const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);
router.get("/", categoryController.listCategories);
router.post("/", categoryController.addCategory);
export default router;
//# sourceMappingURL=category.route.js.map