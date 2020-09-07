import CurrentUser from './CurrentUser.gql';
import CouponByCode from './CouponByCode.gql';
import CreateBuyModuleIntent from './CreateBuyModuleIntent.gql';
import CreateCompany from './CreateCompany.gql';
import DidConfirmBuyModuleIntent from './DidConfirmBuyModuleIntent.gql';
import ModulesOverview from './ModulesOverview.gql';
import OnboardingModule from './OnboardingModule.gql';

export default {
  queries: {
    currentUser: CurrentUser,
    couponByCode: CouponByCode,
    modulesOverview: ModulesOverview,
    onboardingModule: OnboardingModule
  },
  mutations: {
    createBuyModuleIntent: CreateBuyModuleIntent,
    createCompany: CreateCompany,
    didConfirmBuyModuleIntent: DidConfirmBuyModuleIntent
  }
};
