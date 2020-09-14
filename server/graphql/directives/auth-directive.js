import { AuthenticationError } from 'apollo-server';
import { InsufficientPermissionError } from '@server/graphql/__customErrors';
import { isEqualOrHigherRole } from '@server/lib/role-helpers';

function isLoggedIn({ user }) {
  if (!user) throw new AuthenticationError('Must authenticate');
  return user;
}

export const directiveTypeDefs = {
  isAuthenticated: 'directive @isAuthenticated on FIELD_DEFINITION',
  hasRole: 'directive @hasRole(role: ROLE!) on FIELD_DEFINITION'
};

export const directiveResolvers = {
  isAuthenticated: (next, source, args, ctx) => {
    isLoggedIn(ctx);
    return next();
  },
  hasRole: (next, source, { role: requiredRoleName }, ctx) => {
    const user = isLoggedIn(ctx);

    if (!ctx.companyId) {
      if (
        isEqualOrHigherRole(user.onboardingStatus.roleName, requiredRoleName)
      ) {
        return next();
      }

      throw new InsufficientPermissionError('Insufficient role');
    } else {
      const company = user.companies.find((c) => c.id === ctx.companyId);

      if (company && isEqualOrHigherRole(company.roleName, requiredRoleName)) {
        return next();
      }

      throw new InsufficientPermissionError('Insufficient role');
    }
  }
};
