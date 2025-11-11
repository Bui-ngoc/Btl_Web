import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export interface ChamCongAttributes {
  id?: number;
  ma_nhan_vien: string;
  checkin: Date;
  checkout?: Date | null;
  duration_hours?: number | null;
}

class ChamCong extends Model<ChamCongAttributes> implements ChamCongAttributes {
  public id!: number;
  public ma_nhan_vien!: string;
  public checkin!: Date;
  public checkout?: Date | null;
  public duration_hours?: number | null;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

ChamCong.init(
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
    checkin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checkout: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    duration_hours: {
      type: DataTypes.DECIMAL(6,2),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'cham_cong',
    timestamps: true,
    underscored: true,
  }
);

export default ChamCong;
