import { RegularExpression } from 'graphql-scalars';
import { ROLE_NAMES } from '@server/constants';

export default {
  NonEmptyString: new RegularExpression('NonEmptyString', /^(?!\s*$).+/),
  ROLE: {
    OWNER: ROLE_NAMES.OWNER,
    ADMIN: ROLE_NAMES.ADMIN,
    EMPLOYEE: ROLE_NAMES.EMPLOYEE
  }
};
