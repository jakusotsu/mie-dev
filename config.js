// config.js
const config = {
    db: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'app',
        password: process.env.DB_PASSWORD || 'wonderful',
        database: process.env.DB_DATABASE || 'miechallenge',
        port: process.env.DB_PORT || 3307
    },
    app: {
        port: process.env.PORT || 3000
    }
};

module.exports = config;
