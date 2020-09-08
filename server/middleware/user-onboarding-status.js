import { onboardingService } from '@server/services';

const middleware = (req, res, next) => {
  if (!req.user) {
    next();
  } else {
    const redirectUrl = onboardingService.getNextStepUrl(req.user);
    if (!redirectUrl) {
      next();
    } else if (req.path === '/graphql') {
      next();
    } else if (req.path === redirectUrl) {
      next();
    } else {
      res.redirect(redirectUrl);
    }
  }
};

export default middleware;
