import { stripe } from '@server/third-party';
import { paymentService } from '@server/services';

export default {
  Mutation: {
    createPaymentIntent: async () => {
      const paymentIntent = await stripe.instance.paymentIntents.create({
        amount: 1099,
        currency: 'usd',
        metadata: { integration_check: 'accept_a_payment' }
      });

      return paymentIntent.client_secret;
    },
    didAcceptPayment: async (_, { paymentIntentId }, { user }) =>
      paymentService.handleAcceptedPayment(user, paymentIntentId)
  }
};
