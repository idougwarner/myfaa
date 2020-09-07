import { paymentService } from '@server/services';

export default {
  Mutation: {
    createBuyModuleIntent: async (_, { moduleId, moduleCount, couponId }) => {
      const intent = await paymentService.createBuyModuleIntent(
        moduleId,
        moduleCount,
        couponId
      );
      return intent.client_secret;
    },
    didConfirmBuyModuleIntent: async (_, { paymentIntentId }, { user }) =>
      paymentService.didConfirmBuyModuleIntent(user, paymentIntentId)
  }
};
