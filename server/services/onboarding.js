import { User } from '@server/models';
import { ROLE_NAMES, ONBOARDING_STEPS } from '@server/constants';

export const getNextStepUrl = (user) => {
  const { lastStep } = user.onboardingStatus;

  if (lastStep === ONBOARDING_STEPS.BUY_MODULE) return null;

  if (user.roleName === ROLE_NAMES.ADMIN) {
    if (lastStep === ONBOARDING_STEPS.CREATE_ACCOUNT) {
      return `/${ONBOARDING_STEPS.SETUP_COMPANY}`;
    }

    if (lastStep === ONBOARDING_STEPS.SETUP_COMPANY) {
      return `/${ONBOARDING_STEPS.BUY_MODULE}`;
    }
  }

  return null;
};

export const createCompany = async (
  adminUser,
  { name, street, city, state, zipcode, country }
) => {
  await User.relatedQuery('company')
    .for(adminUser.id)
    .insert({ name, street, city, state, zipcode, country });

  await User.relatedQuery('onboardingStatus')
    .for(adminUser.id)
    .patch({ lastStep: ONBOARDING_STEPS.SETUP_COMPANY });
};

export const completeOnboarding = async (userId) => {
  await User.relatedQuery('onboardingStatus').for(userId).patch({
    lastStep: ONBOARDING_STEPS.BUY_MODULE
  });
};
