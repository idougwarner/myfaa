import { Company } from '@server/models';

export const addModules = async (companyId, moduleId, moduleCount) => {
  const companyModule = await Company.relatedQuery('modules')
    .for(companyId)
    .where('moduleId', moduleId)
    .first();

  if (!companyModule) {
    await Company.relatedQuery('modules').for(companyId).relate({
      id: moduleId,
      moduleCount
    });
  } else {
    await Company.relatedQuery('modules')
      .for(companyId)
      .patch({
        moduleCount: companyModule.moduleCount + moduleCount
      })
      .where('moduleId', moduleId);
  }
};
