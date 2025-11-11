import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || '3306'),
  timezone: '+07:00', // UTC+7 for Asia/Bangkok
  define: {
    timestamps: true,
    underscored: true,
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});