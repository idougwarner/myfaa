import { User } from '@server/models';

export default {
  User: {
    companies: (parent, args, { user }) =>
      User.relatedQuery('companies').for(user.id)
  },
  Query: {
    currentUser: (parent, args, { user }) => user
  }
};
