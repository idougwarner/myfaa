import { User } from '@server/models';
import { stripe } from '@server/third-party';
import { ONBOARDING_STEPS } from '@server/constants';
import {
  PaymentIntentNotFound,
  PaymentIntentNotCharged
} from '@server/graphql/__customErrors';

export const handleAcceptedPayment = async (user, paymentIntentId) => {
  try {
    const paymentIntent = await stripe.instance.paymentIntents.retrieve(
      paymentIntentId
    );

    if (paymentIntent.amount !== paymentIntent.amount_received) {
      throw new PaymentIntentNotCharged('Payment intent not charged');
    }

    if (
      user.onboardingStatus.currentStep === ONBOARDING_STEPS.SETUP_COMPANY &&
      user.onboardingStatus.completed
    ) {
      await User.relatedQuery('onboardingStatus').for(user.id).patch({
        currentStep: ONBOARDING_STEPS.BUY_MODULE,
        completed: true
      });
    }
  } catch (error) {
    throw new PaymentIntentNotFound('Payment intent not found');
  }
};
