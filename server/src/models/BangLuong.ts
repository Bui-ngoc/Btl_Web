import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export interface BangLuongAttributes {
  id?: number;
  ma_nhan_vien: string;
  thang: number;
  nam: number;
  tong_gio_lam: number;
  luong_co_ban: number;
  luong_them: number;
  tong_luong: number;
  status?: 'Draft' | 'Finalized';
}

class BangLuong extends Model<BangLuongAttributes> implements BangLuongAttributes {
  public id!: number;
  public ma_nhan_vien!: string;
  public thang!: number;
  public nam!: number;
  public tong_gio_lam!: number;
  public luong_co_ban!: number;
  public luong_them!: number;
  public tong_luong!: number;
  public status?: 'Draft' | 'Finalized';

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

BangLuong.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    ma_nhan_vien: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    thang: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nam: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tong_gio_lam: {
      type: DataTypes.DECIMAL(6,2),
      allowNull: false,
    },
    luong_co_ban: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
    },
    luong_them: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
      defaultValue: 0,
    },
    tong_luong: {
      type: DataTypes.DECIMAL(12,2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Draft', 'Finalized'),
      defaultValue: 'Draft',
    },
  },
  {
    sequelize,
    tableName: 'bang_luong',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['ma_nhan_vien', 'thang', 'nam'],
      },
    ],
  }
);

export default BangLuong;
