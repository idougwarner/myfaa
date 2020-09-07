// eslint-disable-next-line max-classes-per-file
import { ApolloError } from 'apollo-server';

export class InsufficientPermissionError extends ApolloError {
  constructor(message) {
    super(message, 'INSUFFICIENT_PERMISSIONS');
  }
}

export class PaymentIntentNotFound extends ApolloError {
  constructor(message) {
    super(message, 'PAYMENT_INTENT_NOT_FOUND');
  }
}

export class PaymentIntentNotCharged extends ApolloError {
  constructor(message) {
    super(message, 'PAYMENT_INTENT_NOT_CHARGED');
  }
}
