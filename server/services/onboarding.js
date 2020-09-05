import { User } from '@server/models';
import { ROLE_NAMES, ONBOARDING_STEPS } from '@server/constants';

export const getNextStepUrl = (user) => {
  const { completed, currentStep } = user.onboardingStatus;

  if (completed) return null;

  if (user.roleName === ROLE_NAMES.ADMIN) {
    if (currentStep === ONBOARDING_STEPS.CREATE_ACCOUNT) {
      return `/${ONBOARDING_STEPS.SETUP_COMPANY}`;
    }

    if (currentStep === ONBOARDING_STEPS.BUY_MODULE) {
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
    .patch({ currentStep: ONBOARDING_STEPS.BUY_MODULE });
};
