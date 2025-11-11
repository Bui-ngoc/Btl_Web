import { Request, Response } from 'express';
import PhongBan from '../models/PhongBan';
import { ValidationError } from 'sequelize';

export const getAllPhongBan = async (req: Request, res: Response) => {
  try {
    const phongBans = await PhongBan.findAll();
    return res.json(phongBans);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

export const getPhongBan = async (req: Request, res: Response) => {
  try {
    const phongBan = await PhongBan.findByPk(req.params.ma_phong);
    if (!phongBan) {
      return res.status(404).json({ message: 'Phòng ban không tồn tại' });
    }
    return res.json(phongBan);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

export const createPhongBan = async (req: Request, res: Response) => {
  try {
    const phongBan = await PhongBan.create(req.body);
    return res.status(201).json(phongBan);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: error.errors.map(e => ({ field: e.path, message: e.message }))
      });
    }
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

export const updatePhongBan = async (req: Request, res: Response) => {
  try {
    const phongBan = await PhongBan.findByPk(req.params.ma_phong);
    if (!phongBan) {
      return res.status(404).json({ message: 'Phòng ban không tồn tại' });
    }
    await phongBan.update(req.body);
    return res.json(phongBan);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: error.errors.map(e => ({ field: e.path, message: e.message }))
      });
    }
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

export const deletePhongBan = async (req: Request, res: Response) => {
  try {
    const phongBan = await PhongBan.findByPk(req.params.ma_phong);
    if (!phongBan) {
      return res.status(404).json({ message: 'Phòng ban không tồn tại' });
    }
    await phongBan.destroy();
    return res.json({ message: 'Phòng ban đã được xóa' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error });
  }
};