import {
  directiveResolvers as authDirectiveResolvers,
  directiveTypeDefs as authDirectiveTypeDefs
} from './auth-directive';
import nonNullOptionalInputDirective from './nonnull-optional-input-directive';

const {
  nonNullOptionalInputDirectiveTypeDefs,
  nonNullOptionalInputDirectiveTransformer
} = nonNullOptionalInputDirective('nonNullOptionalInput');

export const directiveTypeDefs = [
  authDirectiveTypeDefs.isAuthenticated,
  authDirectiveTypeDefs.hasRole,
  nonNullOptionalInputDirectiveTypeDefs
];

export const directiveResolvers = {
  ...authDirectiveResolvers
};

export const schemaTransforms = [nonNullOptionalInputDirectiveTransformer];
