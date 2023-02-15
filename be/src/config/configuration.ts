export default () => ({
  PORT: process.env.APP_PORT,
  DB: {
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    NAME: process.env.DB_NAME,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    MODULE_NAME: 'DB_CONNECTION',
    COLLECTIONS: {
      USERS: 'users',
    },
  },
  APP_VERSION: process.env.APP_VERSION,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_LIFE: process.env.ACCESS_TOKEN_LIFE,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_LIFE: process.env.REFRESH_TOKEN_LIFE,
});
