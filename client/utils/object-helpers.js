export const addItemToNestedArray = (json, key, item) => ({
  ...json,
  [key]: [...json[key], item]
});

export const removeItemFromNestedArray = (json, key, item) => ({
  ...json,
  [key]: json[key].filter((d) => d.id !== item.id)
});

export const setNewValue = (data, key, value) => ({
  ...data,
  [key]: value
});

export const extractKeysIntoObject = (json, keys) =>
  keys.reduce((m, key) => ({ ...m, [key]: json[key] }), {});
