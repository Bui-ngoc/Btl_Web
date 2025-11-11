import { Request, Response } from 'express';
import NhanVien from '../models/NhanVien';
import { ValidationError } from 'sequelize';

// Helper: generate next ma_nhan_vien using pattern <ma_phong(3)><ma_chuc_vu(1)><seq4>
const generateMaNhanVien = async (ma_phong: string, ma_chuc_vu: string) => {
  // find existing ma_nhan_vien and compute max suffix
  const all = await NhanVien.findAll({ attributes: ['ma_nhan_vien'] });
  let maxSeq = 0;
  const prefix = `${ma_phong}${ma_chuc_vu}`;
  for (const row of all) {
    const m = row.getDataValue('ma_nhan_vien') as string;
    if (m && m.startsWith(prefix) && m.length >= prefix.length + 4) {
      const seqStr = m.slice(-4);
      const num = parseInt(seqStr, 10);
      if (!isNaN(num) && num > maxSeq) maxSeq = num;
    }
  }
  const next = (maxSeq + 1).toString().padStart(4, '0');
  return `${prefix}${next}`;
};

export const getAllNhanVien = async (req: Request, res: Response) => {
  try {
    const items = await NhanVien.findAll();
    return res.json(items);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

export const getNhanVien = async (req: Request, res: Response) => {
  try {
    const item = await NhanVien.findByPk(req.params.ma_nhan_vien);
    if (!item) return res.status(404).json({ message: 'Nhân viên không tồn tại' });
    return res.json(item);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

export const createNhanVien = async (req: Request, res: Response) => {
  try {
    const { ma_phong, ma_chuc_vu } = req.body;
    if (!ma_phong || !ma_chuc_vu) {
      return res.status(400).json({ message: 'ma_phong and ma_chuc_vu are required' });
    }
    let ma_nhan_vien = req.body.ma_nhan_vien;
    if (!ma_nhan_vien) {
      ma_nhan_vien = await generateMaNhanVien(ma_phong, ma_chuc_vu);
    }
    req.body.ma_nhan_vien = ma_nhan_vien;
    const item = await NhanVien.create(req.body);
    return res.status(201).json(item);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ errors: error.errors.map(e => ({ field: e.path, message: e.message })) });
    }
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

export const updateNhanVien = async (req: Request, res: Response) => {
  try {
    const item = await NhanVien.findByPk(req.params.ma_nhan_vien);
    if (!item) return res.status(404).json({ message: 'Nhân viên không tồn tại' });
    await item.update(req.body);
    return res.json(item);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ errors: error.errors.map(e => ({ field: e.path, message: e.message })) });
    }
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

export const deleteNhanVien = async (req: Request, res: Response) => {
  try {
    const item = await NhanVien.findByPk(req.params.ma_nhan_vien);
    if (!item) return res.status(404).json({ message: 'Nhân viên không tồn tại' });
    await item.destroy();
    return res.json({ message: 'Nhân viên đã bị xóa' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};
