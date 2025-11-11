import { Request, Response } from 'express';
import ChucVu from '../models/ChucVu';
import { ValidationError } from 'sequelize';

export const getAllChucVu = async (req: Request, res: Response) => {
  try {
    const items = await ChucVu.findAll();
    return res.json(items);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

export const getChucVu = async (req: Request, res: Response) => {
  try {
    const item = await ChucVu.findByPk(req.params.ma_chuc_vu);
    if (!item) return res.status(404).json({ message: 'Chức vụ không tồn tại' });
    return res.json(item);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

export const createChucVu = async (req: Request, res: Response) => {
  try {
    const item = await ChucVu.create(req.body);
    return res.status(201).json(item);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ errors: error.errors.map(e => ({ field: e.path, message: e.message })) });
    }
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

export const updateChucVu = async (req: Request, res: Response) => {
  try {
    const item = await ChucVu.findByPk(req.params.ma_chuc_vu);
    if (!item) return res.status(404).json({ message: 'Chức vụ không tồn tại' });
    await item.update(req.body);
    return res.json(item);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ errors: error.errors.map(e => ({ field: e.path, message: e.message })) });
    }
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

export const deleteChucVu = async (req: Request, res: Response) => {
  try {
    const item = await ChucVu.findByPk(req.params.ma_chuc_vu);
    if (!item) return res.status(404).json({ message: 'Chức vụ không tồn tại' });
    await item.destroy();
    return res.json({ message: 'Chức vụ đã bị xóa' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};
