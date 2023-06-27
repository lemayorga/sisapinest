
export const EnvConfiguration = () => ({
    enviroment: process.env.NODE_ENV || 'dev',
    port: process.env.PORT ||  3002,
    hostAPI: process.env.HOST_API,
    databaseUrl: process.env.DATABASE_URL,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET
});

export const EnvCofigName = {
    enviroment: 'enviroment',
    port: 'PORT',
    hostAPI: 'HOST_API',
    databaseUrl: 'DATABASE_URL',
    jwtSecret: 'JWT_ACCESS_SECRET',
    jwtRefresh: 'JWT_REFRESH_SECRET'
}

