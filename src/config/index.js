require('dotenv').config();

module.exports = {
  [process.env.NODE_ENV || 'development']: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'db-password',
    database: process.env.DB_NAME || 'name',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    port: process.env.DB_PORT || '3306'
  },
  mode: process.env.NODE_ENV || 'development',
  port: process.env.PORT || '3000',
  jwtSecret: process.env.JWT_ENCRYPTION || 'jwt_please_change',
  jwtExpiration: process.env.JWT_EXPIRATION || '10000'
};
