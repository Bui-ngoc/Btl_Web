import { Router } from 'express';
import * as chucVuController from '../controllers/chucVuController';
import { checkAuth } from '../middlewares/auth';

const router = Router();

router.use(checkAuth);

router.get('/', chucVuController.getAllChucVu);
router.get('/:ma_chuc_vu', chucVuController.getChucVu);
router.post('/', chucVuController.createChucVu);
router.put('/:ma_chuc_vu', chucVuController.updateChucVu);
router.delete('/:ma_chuc_vu', chucVuController.deleteChucVu);

export default router;
