import { Company } from '@server/models';
import { onboardingService } from '@server/services';

export default {
  Company: {
    modules: (company) => Company.relatedQuery('modules').for(company.id)
  },
  Query: {
    currentCompany: (parent, arg, { user, loaders }) =>
      loaders.company.load(user.companyId)
  },
  Mutation: {
    createCompany: async (_, { input }, { user }) =>
      onboardingService.createCompany(user, input)
  }
};
