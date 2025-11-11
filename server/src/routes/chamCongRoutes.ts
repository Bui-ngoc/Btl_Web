import { Router } from 'express';
import * as chamCongController from '../controllers/chamCongController';
import { checkAuth } from '../middlewares/auth';

const router = Router();
router.use(checkAuth);

router.get('/', chamCongController.getChamCong);
router.post('/checkin', chamCongController.checkIn);
router.post('/checkout', chamCongController.checkOut);

export default router;
