import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export interface ChucVuAttributes {
  ma_chuc_vu: string;
  ten_chuc_vu: string;
}

class ChucVu extends Model<ChucVuAttributes> implements ChucVuAttributes {
  public ma_chuc_vu!: string;
  public ten_chuc_vu!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

ChucVu.init(
  {
    ma_chuc_vu: {
      type: DataTypes.CHAR(1),
      primaryKey: true,
      validate: {
        len: [1, 1],
      },
    },
    ten_chuc_vu: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'chuc_vu',
    timestamps: true,
    underscored: true,
  }
);

export default ChucVu;
