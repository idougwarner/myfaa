import { ONBOARDING_STEPS } from '@server/constants';
import { paymentService, onboardingService } from '@server/services';

export default {
  Mutation: {
    createBuyModuleIntent: async (
      _,
      { moduleId, moduleCount, couponId },
      { companyId }
    ) => {
      const intent = await paymentService.createBuyModuleIntent(
        companyId,
        moduleId,
        moduleCount,
        couponId
      );
      return intent.client_secret;
    },
    didConfirmBuyModuleIntent: async (_, { paymentIntentId }, { user }) => {
      await paymentService.didConfirmBuyModuleIntent(paymentIntentId);

      if (user.onboardingStatus.lastStep === ONBOARDING_STEPS.SETUP_COMPANY) {
        await onboardingService.completeOnboarding(user.id);
      }
    }
  }
};
