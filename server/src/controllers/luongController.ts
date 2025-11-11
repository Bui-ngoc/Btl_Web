import { Request, Response } from 'express';
import ChamCong from '../models/ChamCong';
import NhanVien from '../models/NhanVien';
import BangLuong from '../models/BangLuong';
import { Op } from 'sequelize';

// helper: round to VND (nearest integer)
const roundVND = (v: number) => Math.round(v);

// Preview payroll: compute payroll rows but do not persist
export const previewPayroll = async (req: Request, res: Response) => {
  try {
    const { thang, nam, scope, ma_phong } = req.body; // scope: company|department
    if (!thang || !nam) return res.status(400).json({ message: 'thang and nam required' });

    // get chấm công in month
    const start = new Date(Number(nam), Number(thang) - 1, 1);
    const end = new Date(Number(nam), Number(thang), 1);

    const where: any = {
      checkin: { [Op.gte]: start, [Op.lt]: end },
    };
    if (ma_phong && scope === 'department') {
      // filter by joining NhanVien
      // we'll fetch employees in that department first
    }

    // fetch all employees (optionally filter by department)
    const nvWhere: any = {};
    if (ma_phong && scope === 'department') nvWhere.ma_phong = ma_phong;
    const employees = await NhanVien.findAll({ where: nvWhere });

    // For each employee, sum rounded durations from ChamCong within month
    const result: any[] = [];

    for (const emp of employees) {
      const sessions = await ChamCong.findAll({
        where: {
          ma_nhan_vien: emp.ma_nhan_vien,
          checkin: { [Op.gte]: start, [Op.lt]: end },
        },
      });

      // sum duration_hours (already rounded per session in checkOut)
      let tong_gio = 0;
      for (const s of sessions) {
        const dh = (s.getDataValue('duration_hours') as any) || 0;
        tong_gio += Number(dh);
      }

      // apply payroll rules
      const luong_co_ban = Number(emp.muc_luong_co_ban);
      const luong_theo_gio = luong_co_ban / 40.0;
      const so_gio_them = Math.max(0, tong_gio - 40);
      const luong_them_raw = so_gio_them * luong_theo_gio * 1.5;
      const luong_them = roundVND(luong_them_raw);
      const tong_luong = roundVND(luong_co_ban + luong_them);

      result.push({
        ma_nhan_vien: emp.ma_nhan_vien,
        ten_nhan_vien: emp.ten_nhan_vien,
        tong_gio,
        luong_co_ban,
        luong_them,
        tong_luong,
      });
    }

    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

// Finalize payroll: compute and persist BangLuong rows (status=Finalized). Upsert behavior.
export const finalizePayroll = async (req: Request, res: Response) => {
  try {
    const { thang, nam, scope, ma_phong } = req.body;
    if (!thang || !nam) return res.status(400).json({ message: 'thang and nam required' });

    const previewRes = await previewComputeRows(Number(thang), Number(nam), scope, ma_phong);

    // persist each row into BangLuong (upsert)
    const created: any[] = [];
    for (const r of previewRes) {
      const [rec, createdFlag] = await BangLuong.upsert(
        {
          ma_nhan_vien: r.ma_nhan_vien,
          thang: Number(thang),
          nam: Number(nam),
          tong_gio_lam: r.tong_gio,
          luong_co_ban: r.luong_co_ban,
          luong_them: r.luong_them,
          tong_luong: r.tong_luong,
          status: 'Finalized',
        },
        { returning: true }
      );
      created.push(rec);
    }

    return res.json({ message: 'Payroll finalized', count: created.length });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

// internal helper used by finalize
const previewComputeRows = async (thang: number, nam: number, scope?: string, ma_phong?: string) => {
  const start = new Date(nam, thang - 1, 1);
  const end = new Date(nam, thang, 1);

  const nvWhere: any = {};
  if (ma_phong && scope === 'department') nvWhere.ma_phong = ma_phong;
  const employees = await NhanVien.findAll({ where: nvWhere });

  const result: any[] = [];
  for (const emp of employees) {
    const sessions = await ChamCong.findAll({
      where: {
        ma_nhan_vien: emp.ma_nhan_vien,
        checkin: { [Op.gte]: start, [Op.lt]: end },
      },
    });

    let tong_gio = 0;
    for (const s of sessions) {
      const dh = (s.getDataValue('duration_hours') as any) || 0;
      tong_gio += Number(dh);
    }

    const luong_co_ban = Number(emp.muc_luong_co_ban);
    const luong_theo_gio = luong_co_ban / 40.0;
    const so_gio_them = Math.max(0, tong_gio - 40);
    const luong_them_raw = so_gio_them * luong_theo_gio * 1.5;
    const luong_them = roundVND(luong_them_raw);
    const tong_luong = roundVND(luong_co_ban + luong_them);

    result.push({
      ma_nhan_vien: emp.ma_nhan_vien,
      ten_nhan_vien: emp.ten_nhan_vien,
      tong_gio,
      luong_co_ban,
      luong_them,
      tong_luong,
    });
  }

  return result;
};
