import { Company } from '@server/models';
import { onboardingService, companyService } from '@server/services';
import { ROLE_NAMES } from '@server/constants';

export default {
  Company: {
    modules: (company) => Company.relatedQuery('modules').for(company.id),
    employees: (company) => Company.relatedQuery('employees').for(company.id)
  },
  Query: {
    currentCompany: (parent, arg, { loaders, companyId }) =>
      loaders.company.load(companyId),
    employees: (parent, arg, { companyId }) =>
      Company.relatedQuery('employees')
        .for(companyId)
        .where('roleName', ROLE_NAMES.EMPLOYEE)
  },
  Mutation: {
    createCompany: async (_, { input }, { user, setCompanyId }) => {
      const companyId = await onboardingService.createCompany(user, input);
      setCompanyId(companyId);
    },
    inviteEmployee: (_, { input }, { companyId }) =>
      companyService.inviteEmployee(companyId, input)
  }
};
