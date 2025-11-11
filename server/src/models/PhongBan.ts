import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export interface PhongBanAttributes {
  ma_phong: string;
  ten_phong: string;
  nam_thanh_lap?: number;
  trang_thai: 'HoatDong' | 'NgungHoatDong';
}

class PhongBan extends Model<PhongBanAttributes> implements PhongBanAttributes {
  public ma_phong!: string;
  public ten_phong!: string;
  public nam_thanh_lap?: number;
  public trang_thai!: 'HoatDong' | 'NgungHoatDong';

  // Timestamps
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

PhongBan.init(
  {
    ma_phong: {
      type: DataTypes.CHAR(3),
      primaryKey: true,
      validate: {
        len: [3, 3],
        isUppercase: true,
      },
    },
    ten_phong: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nam_thanh_lap: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isNumeric: true,
        min: 1900,
        max: new Date().getFullYear(),
      },
    },
    trang_thai: {
      type: DataTypes.ENUM('HoatDong', 'NgungHoatDong'),
      defaultValue: 'HoatDong',
    },
  },
  {
    sequelize,
    tableName: 'phong_ban',
    timestamps: true,
    underscored: true,
  }
);

export default PhongBan;