import Stripe from 'stripe';
import config from '@server/config';

const stripe = new Stripe(config.stripe.secretKey);

export const instance = stripe;
