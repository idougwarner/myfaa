import { ROLE_NAMES } from '@server/constants';

export const isEqualOrHigherRole = (roleA, roleB) => {
  if (roleA === ROLE_NAMES.OWNER) return true;
  if (roleA === ROLE_NAMES.ADMIN && roleB !== ROLE_NAMES.OWNER) return true;
  if (roleB === ROLE_NAMES.EMPLOYEE && roleB === ROLE_NAMES.EMPLOYEE) {
    return true;
  }

  return false;
};
