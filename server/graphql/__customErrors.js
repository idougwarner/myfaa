import { ApolloError } from 'apollo-server';

export class InsufficientPermissionError extends ApolloError {
  constructor(message) {
    super(message, 'INSUFFICIENT_PERMISSIONS');
  }
}
