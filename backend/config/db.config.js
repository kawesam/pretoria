module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "password",
    DB: "database_development",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
