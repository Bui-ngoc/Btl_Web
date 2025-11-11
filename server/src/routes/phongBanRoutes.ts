import { Router } from 'express';
import * as phongBanController from '../controllers/phongBanController';
import { validatePhongBan } from '../middlewares/validators/phongBanValidator';
import { checkAuth } from '../middlewares/auth';

const router = Router();

router.use(checkAuth); // All routes require authentication

// GET /api/v1/phong-ban
router.get('/', phongBanController.getAllPhongBan);

// GET /api/v1/phong-ban/:ma_phong
router.get('/:ma_phong', phongBanController.getPhongBan);

// POST /api/v1/phong-ban
router.post('/', validatePhongBan, phongBanController.createPhongBan);

// PUT /api/v1/phong-ban/:ma_phong
router.put('/:ma_phong', validatePhongBan, phongBanController.updatePhongBan);

// DELETE /api/v1/phong-ban/:ma_phong
router.delete('/:ma_phong', phongBanController.deletePhongBan);

export default router;