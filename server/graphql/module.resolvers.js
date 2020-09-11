import { Module } from '@server/models';

export default {
  Module: {
    courses: (module) => Module.relatedQuery('courses').for(module.id),
    coursesCount: async (module) => {
      const data = await Module.relatedQuery('courses').for(module.id).count();
      return data[0].count;
    }
  },
  Query: {
    modulesOverview: () => Module.query(),
    onboardingModule: (parent, args, { user, loaders }) => {
      const { moduleId } = user.onboardingStatus;
      if (moduleId) {
        return loaders.module.load(moduleId);
      }

      return null;
    }
  }
};
