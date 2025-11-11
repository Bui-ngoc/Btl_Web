import { Request, Response } from 'express';
import ChamCong from '../models/ChamCong';
import NhanVien from '../models/NhanVien';

export const getChamCong = async (req: Request, res: Response) => {
  try {
    const { ma_nhan_vien } = req.query;
    const where: any = {};
    if (ma_nhan_vien) where.ma_nhan_vien = ma_nhan_vien;
    const sessions = await ChamCong.findAll({ where, order: [['checkin', 'DESC']] });
    return res.json(sessions);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

export const checkIn = async (req: Request, res: Response) => {
  try {
    const { ma_nhan_vien, checkin } = req.body;
    if (!ma_nhan_vien || !checkin) return res.status(400).json({ message: 'ma_nhan_vien and checkin are required' });

    // ensure employee exists
    const nv = await NhanVien.findByPk(ma_nhan_vien);
    if (!nv) return res.status(404).json({ message: 'Nhân viên không tồn tại' });

    // check open session
    const open = await ChamCong.findOne({ where: { ma_nhan_vien, checkout: null } });
    if (open) return res.status(400).json({ message: 'Đã tồn tại phiên mở. Vui lòng check-out trước.' });

    const session = await ChamCong.create({ ma_nhan_vien, checkin: new Date(checkin), checkout: null });
    return res.status(201).json(session);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

export const checkOut = async (req: Request, res: Response) => {
  try {
    const { ma_nhan_vien, checkout } = req.body;
    if (!ma_nhan_vien || !checkout) return res.status(400).json({ message: 'ma_nhan_vien and checkout are required' });

    // find latest open session
    const open = await ChamCong.findOne({ where: { ma_nhan_vien, checkout: null }, order: [['checkin', 'DESC']] });
    if (!open) return res.status(400).json({ message: 'Không tìm thấy phiên mở để checkout' });

    const checkoutDate = new Date(checkout);
    if (checkoutDate <= open.checkin) return res.status(400).json({ message: 'Thời gian checkout phải lớn hơn checkin' });

    // compute duration in hours (decimal)
    const durationMs = checkoutDate.getTime() - open.checkin.getTime();
    const rawHours = durationMs / (1000 * 60 * 60);
    // rounding to 0.25 step
    const rounded = Math.round(rawHours * 4) / 4;

    open.checkout = checkoutDate;
    open.duration_hours = rounded;
    await open.save();

    return res.json(open);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};
