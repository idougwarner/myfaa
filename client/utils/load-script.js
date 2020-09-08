const loadScript = async (scriptUrl, key) => {
  if (key && window[`${key}Loaded`]) return;
  const response = await fetch(scriptUrl);
  const script = await response.text();
  // eslint-disable-next-line no-eval
  eval(script);
  if (key) {
    window[`${key}Loaded`] = true;
  }
};

export default loadScript;
