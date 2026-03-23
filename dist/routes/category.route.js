import { Router } from 'express';
import { listCategories, addCategory } from '../controllers/category.controller';
// Jangan lupa buat validasi untuk kategori juga!
const router = Router();
router.get('/', listCategories);
router.post('/', addCategory);
export default router;
//# sourceMappingURL=category.route.js.map