import { Router } from 'express';
import * as nhanVienController from '../controllers/nhanVienController';
import { checkAuth } from '../middlewares/auth';

const router = Router();
router.use(checkAuth);

router.get('/', nhanVienController.getAllNhanVien);
router.get('/:ma_nhan_vien', nhanVienController.getNhanVien);
router.post('/', nhanVienController.createNhanVien);
router.put('/:ma_nhan_vien', nhanVienController.updateNhanVien);
router.delete('/:ma_nhan_vien', nhanVienController.deleteNhanVien);

export default router;
