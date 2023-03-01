// require('dotenv').config()
import dotenv from 'dotenv';
dotenv.config();

export default  {
    PORT: process.env.PORT,
    mongoURL:process.env.MONGO_URL,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: process.env.JWT_EXPIRES_IN,
    dbLocal: process.env.DB_LOCAL,
}

// module.exports = config;