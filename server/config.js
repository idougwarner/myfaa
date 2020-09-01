export default {
  NODE_ENV: process.env.NODE_ENV,
  SESSION_SECRET: process.env.SESSION_SECRET || global.SESSION_SECRET,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};
