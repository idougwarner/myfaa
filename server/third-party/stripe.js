import Stripe from 'stripe';
import config from '@server/config';

const stripe = new Stripe(config.STRIPE_SECRET_KEY);

export const instance = stripe;
