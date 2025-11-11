import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validatePhongBan = [
  // ma_phong validation
  body('ma_phong')
    .isLength({ min: 3, max: 3 })
    .withMessage('Mã phòng phải có đúng 3 ký tự')
    .matches(/^[A-Z]{3}$/)
    .withMessage('Mã phòng phải là 3 chữ cái in hoa'),

  // ten_phong validation
  body('ten_phong')
    .notEmpty()
    .withMessage('Tên phòng không được để trống')
    .isLength({ max: 100 })
    .withMessage('Tên phòng không được quá 100 ký tự'),

  // nam_thanh_lap validation
  body('nam_thanh_lap')
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage('Năm thành lập không hợp lệ'),

  // trang_thai validation
  body('trang_thai')
    .optional()
    .isIn(['HoatDong', 'NgungHoatDong'])
    .withMessage('Trạng thái không hợp lệ'),

  // Handle validation results
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];