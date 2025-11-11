import { Router } from 'express';
import phongBanRoutes from './phongBanRoutes';
import chucVuRoutes from './chucVuRoutes';
import nhanVienRoutes from './nhanVienRoutes';
import chamCongRoutes from './chamCongRoutes';
import luongRoutes from './luongRoutes';

const router = Router();

router.use('/phong-ban', phongBanRoutes);
router.use('/chuc-vu', chucVuRoutes);
router.use('/nhan-vien', nhanVienRoutes);
router.use('/cham-cong', chamCongRoutes);
router.use('/luong', luongRoutes);

export default router;
