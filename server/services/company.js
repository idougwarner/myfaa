import { Company } from '@server/models';

export const addModules = async (companyId, moduleId, moduleCount) => {
  const queryBuilder = Company.relatedQuery('modules').for(companyId);
  const companyModule = await queryBuilder.where('moduleId', moduleId).first();

  if (!companyModule) {
    await queryBuilder.insert({ moduleId, moduleCount });
  } else {
    await queryBuilder
      .patch({
        moduleCount: companyModule.moduleCount + moduleCount
      })
      .where('moduleId', moduleId);
  }
};
