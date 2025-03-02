export default () => ({
  port: parseInt(`${process.env.PORT || 3000}`, 10),
  environment: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV && process.env.NODE_ENV === 'production',
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(`${process.env.DATABASE_PORT || 5432}`, 10),
    username: process.env.DATABASE_USERNAME || '',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || '',
  },
  lokiTransportConfig: {
    host: process.env.LOKI_HOST || '',
    json: true,
    labels: { app: process.env.LOKI_APP_LABEL, environment: process.env.NODE_ENV || 'development' },
    interval: parseInt(`${process.env.LOKI_INTERVAL || 3}`, 10),
    replaceTimestamp: true,
  },
  logLevel: process.env.LOG_LEVEL || 'info',
});