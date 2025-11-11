import { Router } from 'express';
import { previewPayroll, finalizePayroll } from '../controllers/luongController';
import { checkAuth } from '../middlewares/auth';

const router = Router();
router.use(checkAuth);

router.post('/preview', previewPayroll);
router.post('/finalize', finalizePayroll);

export default router;
