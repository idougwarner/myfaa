import { AuthenticationError } from 'apollo-server';
import { InsufficientPermissionError } from '@server/graphql/__customErrors';
import { isEqualOrHigherRole } from '@server/lib/role-helpers';

function isLoggedIn({ user }) {
  if (!user) throw new AuthenticationError('Must authenticate');
  return user;
}

export const directiveTypeDefs = {
  isAuthenticated: 'directive @isAuthenticated on FIELD_DEFINITION',
  hasRole: 'directive @hasRole(role: Role!) on FIELD_DEFINITION'
};

export const directiveResolvers = {
  isAuthenticated: (next, source, args, ctx) => {
    isLoggedIn(ctx);
    return next();
  },
  hasRole: (next, source, { role: requiredRoleName }, ctx) => {
    const user = isLoggedIn(ctx);

    if (isEqualOrHigherRole(user.role.name, requiredRoleName)) {
      return next();
    }

    throw new InsufficientPermissionError('Insufficient role');
  }
};
