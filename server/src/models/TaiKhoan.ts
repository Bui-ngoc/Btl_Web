import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

const TaiKhoan = sequelize.define('TaiKhoan', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ma_nhan_vien: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'tai_khoan', // tên bảng trong MySQL
  timestamps: false,
});

export default TaiKhoan;