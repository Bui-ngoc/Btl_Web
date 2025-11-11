import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export interface NhanVienAttributes {
  ma_nhan_vien: string;
  ten_nhan_vien: string;
  ma_phong: string;
  ma_chuc_vu: string;
  muc_luong_co_ban: number;
  ngay_vao_lam?: Date;
  trang_thai?: 'DangLam' | 'DaNghi' | 'TamNghi';
}

class NhanVien extends Model<NhanVienAttributes> implements NhanVienAttributes {
  public ma_nhan_vien!: string;
  public ten_nhan_vien!: string;
  public ma_phong!: string;
  public ma_chuc_vu!: string;
  public muc_luong_co_ban!: number;
  public ngay_vao_lam?: Date;
  public trang_thai?: 'DangLam' | 'DaNghi' | 'TamNghi';

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

NhanVien.init(
  {
    ma_nhan_vien: {
      type: DataTypes.STRING(12),
      primaryKey: true,
    },
    ten_nhan_vien: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ma_phong: {
      type: DataTypes.CHAR(3),
      allowNull: false,
    },
    ma_chuc_vu: {
      type: DataTypes.CHAR(1),
      allowNull: false,
    },
    muc_luong_co_ban: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      defaultValue: 0,
    },
    ngay_vao_lam: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    trang_thai: {
      type: DataTypes.ENUM('DangLam', 'DaNghi', 'TamNghi'),
      defaultValue: 'DangLam',
    },
  },
  {
    sequelize,
    tableName: 'nhan_vien',
    timestamps: true,
    underscored: true,
  }
);

export default NhanVien;
