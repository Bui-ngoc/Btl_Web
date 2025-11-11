require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
  try {
    const config = {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'baitaplon',
      port: parseInt(process.env.DB_PORT || '3306', 10),
    };
    console.log('Attempting to connect to MySQL with config:', { host: config.host, user: config.user, database: config.database, port: config.port });
    const conn = await mysql.createConnection(config);
    const [rows] = await conn.query('SELECT 1 as ok');
    console.log('DB test successful:', rows);
    await conn.end();
    process.exit(0);
  } catch (err) {
    console.error('DB test error:', err.message || err);
    process.exit(1);
  }
})();
