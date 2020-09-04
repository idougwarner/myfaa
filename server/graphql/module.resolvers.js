import { Module } from '@server/models';

export default {
  Module: {
    coursesCount: async (module) => {
      const data = await Module.relatedQuery('courses').for(module.id).count();
      return data[0].count;
    }
  },
  Query: {
    modulesOverview: () => Module.query()
  }
};
