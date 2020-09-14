import { ApolloError } from 'apollo-server';
import { Module, Transaction } from '@server/models';
import { stripe } from '@server/third-party';
import { ONBOARDING_STEPS } from '@server/constants';
import { NotFoundError } from '@server/graphql/__customErrors';
import * as onboardingService from './onboarding';
import * as couponService from './coupon';
import * as companyService from './company';

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
    metadata: { moduleId, moduleCount, couponId }
  });

  return paymentIntent;
};

export const didConfirmBuyModuleIntent = async (user, paymentIntentId) => {
  let paymentIntent;

  try {
    paymentIntent = await stripe.instance.paymentIntents.retrieve(
      paymentIntentId
    );
  } catch (e) {
    throw new NotFoundError('Payment intent does not exist');
  }

  if (paymentIntent.amount !== paymentIntent.amount_received) {
    throw new ApolloError('Payment intent not charged');
  }

  const { moduleId, moduleCount, couponId } = paymentIntent.metadata;

  await companyService.addModules(
    user.companyId,
    moduleId,
    parseInt(moduleCount, 10)
  );

  if (user.onboardingStatus.lastStep === ONBOARDING_STEPS.SETUP_COMPANY) {
    onboardingService.completeOnboarding(user.id);
  }

  const transaction = {
    companyId: user.companyId,
    moduleId: parseInt(moduleId, 10),
    moduleCount: parseInt(moduleCount, 10),
    amount: paymentIntent.amount_received,
    paymentIntentId: paymentIntent.id
  };
  if (couponId) {
    transaction.couponId = parseInt(couponId, 10);
  }
  await Transaction.query().insert(transaction);
};
