module.exports = {
  mysql: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_HOST || 3306,
    user: process.env.DB_USER || "admin",
    database: process.env.DB_DATABASE || "candles",
    password: process.env.DB_PASS || "foobar"
  }
};
