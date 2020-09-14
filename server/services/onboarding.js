import { User } from '@server/models';
import { ROLE_NAMES, ONBOARDING_STEPS } from '@server/constants';

export const getNextStepUrl = (user) => {
  const { lastStep, roleName } = user.onboardingStatus;
  if (lastStep === ONBOARDING_STEPS.BUY_MODULE) return null;

  if (roleName === ROLE_NAMES.ADMIN) {
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
  const company = await User.relatedQuery('companies')
    .for(adminUser.id)
    .insert({
      name,
      street,
      city,
      state,
      zipcode,
      country,
      roleName: ROLE_NAMES.ADMIN
    })
    .returning('*');

  await User.relatedQuery('onboardingStatus')
    .for(adminUser.id)
    .patch({ lastStep: ONBOARDING_STEPS.SETUP_COMPANY });

  return company.id;
};

export const completeOnboarding = async (userId) => {
  await User.relatedQuery('onboardingStatus').for(userId).patch({
    lastStep: ONBOARDING_STEPS.BUY_MODULE
  });
};
