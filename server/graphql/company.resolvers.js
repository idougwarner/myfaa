import { Company } from '@server/models';
import { onboardingService } from '@server/services';
import { ROLE_NAMES } from '@server/constants';

export default {
  Company: {
    modules: (company) => Company.relatedQuery('modules').for(company.id),
    employees: (company) => Company.relatedQuery('employees').for(company.id)
  },
  Query: {
    currentCompany: (parent, arg, { user, loaders }) =>
      loaders.company.load(user.companyId),
    employees: (parent, arg, { user }) =>
      Company.relatedQuery('employees')
        .for(user.companyId)
        .where('roleName', ROLE_NAMES.EMPLOYEE)
  },
  Mutation: {
    createCompany: async (_, { input }, { user }) =>
      onboardingService.createCompany(user, input)
  }
};
