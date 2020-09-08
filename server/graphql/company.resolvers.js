import { onboardingService } from '@server/services';

export default {
  Mutation: {
    createCompany: async (_, { input }, { user }) =>
      onboardingService.createCompany(user, input)
  }
};
