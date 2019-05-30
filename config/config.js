const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    ENV: process.env.NODE_ENV,
    VERSION: process.env.APP_VERSION,
    DB_CONNECTION: getEnv(process.env.NODE_ENV),
    PORT: process.env.PORT,
    KEY: process.env.SECRET,
};

function getEnv(env) {
    switch (env) {
        case 'test':
            return process.env.DATABASE_URL_TEST;
        case 'production':
            return process.env.DATABASE_URL_PRODUCTION;
        default:
            return process.env.DATABASE_URL_DEVELOPMENT;
    }
}