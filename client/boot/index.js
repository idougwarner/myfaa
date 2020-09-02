export default (bootFiles = [], context) => {
  bootFiles.map(async (bootFile) => {
    // eslint-disable-next-line
    const bootModule = await require(`./${bootFile}`);
    bootModule.default(context);
  });
};
