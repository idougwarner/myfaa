import CurrentUser from './CurrentUser.gql';
import { GetCouponByCode } from './Payment.gql';
import {
  GetModulesOverview,
  GetOnboardingModule,
  CreateCompany,
  CreateBuyModuleIntent,
  DidConfirmBuyModuleIntent
} from './Onboarding.gql';
import {
  GetDepartments,
  CreateDepartment,
  AssignCourse
} from './Department.gql';
import {
  GetCurrentCompany,
  GetCompanyEmployee,
  InviteEmployee
} from './Company.gql';

export default {
  queries: {
    currentUser: CurrentUser,
    couponByCode: GetCouponByCode,
    modulesOverview: GetModulesOverview,
    onboardingModule: GetOnboardingModule,
    departments: GetDepartments,
    currentCompany: GetCurrentCompany,
    companyEmployees: GetCompanyEmployee
  },
  mutations: {
    createBuyModuleIntent: CreateBuyModuleIntent,
    createCompany: CreateCompany,
    didConfirmBuyModuleIntent: DidConfirmBuyModuleIntent,
    createDepartment: CreateDepartment,
    assignCourseToDepartment: AssignCourse,
    inviteEmployee: InviteEmployee
  }
};
