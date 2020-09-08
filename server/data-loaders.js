import DataLoader from 'dataloader';
import { User, Module, Company } from '@server/models';

function createLoader(model, opts) {
  const idKey = (opts && opts.idKey) || 'id';

  return new DataLoader(async (keys) => {
    const items = await model.query().findByIds(keys);
    return keys.map((key) =>
      items.find((item) => item[idKey].toString() === key.toString())
    );
  });
}

export const createLoaders = () => ({
  user: createLoader(User),
  module: createLoader(Module),
  company: createLoader(Company)
});
