import { ApolloError } from 'apollo-server';
import { Module } from '@server/models';
import { stripe } from '@server/third-party';
import { ONBOARDING_STEPS } from '@server/constants';
import { NotFoundError } from '@server/graphql/__customErrors';
import * as onboardingService from './onboarding';
import * as couponService from './coupon';

export const createBuyModuleIntent = async (
  moduleId,
  moduleCount,
  couponId
) => {
  const module = await Module.query().findById(moduleId);

  if (!module) {
    throw new NotFoundError('The module does not exist');
  }

  const subTotal = module.price * moduleCount;
  const grandTotal = await couponService.applyCoupon(subTotal, couponId);

  const paymentIntent = await stripe.instance.paymentIntents.create({
    amount: grandTotal * 100,
    currency: 'usd',
    metadata: { integration_check: 'accept_a_payment' }
  });

  return paymentIntent;
};

export const didConfirmBuyModuleIntent = async (user, paymentIntentId) => {
  try {
    const paymentIntent = await stripe.instance.paymentIntents.retrieve(
      paymentIntentId
    );

    if (paymentIntent.amount !== paymentIntent.amount_received) {
      throw new ApolloError('Payment intent not charged');
    }

    if (user.onboardingStatus.lastStep === ONBOARDING_STEPS.SETUP_COMPANY) {
      onboardingService.completeOnboarding(user.id);
    }
  } catch (error) {
    throw new NotFoundError('Payment intent does not exist');
  }
};
