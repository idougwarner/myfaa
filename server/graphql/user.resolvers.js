export default {
  User: {
    company: (user, _, { loaders }) => loaders.company.load(user.companyId)
  },
  Query: {
    currentUser: (parent, args, { user }) => user
  }
};
