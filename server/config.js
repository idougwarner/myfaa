export default {
  NODE_ENV: process.env.NODE_ENV,
  baseUrl: process.env.BASE_URL,
  sessionSecret: process.env.SESSION_SECRET || global.SESSION_SECRET,
  logLevel: process.env.LOG_LEVEL || 'info',
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY
  },
  aws: {
    sesRegion: process.env.AWS_SES_REGION
  },
  emailTemplates: {
    invitation: process.env.AWS_SES_TEMPLATE_INVITATION
  }
};
