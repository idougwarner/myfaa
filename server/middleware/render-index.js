import fs from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import path from 'path';

function getBundleFileNames() {
  const assetMapData = JSON.parse(
    fs.readFileSync(
      path.resolve(
        path.join(process.env.ASSETS_DIR, process.env.ASSETS_MAP_FILE)
      )
    )
  );

  return {
    css: assetMapData['bundle.css'],
    runtime: assetMapData['runtime.js'],
    vendor: assetMapData['vendor.js'],
    js: assetMapData['bundle.js']
  };
}

function getBundleURLs() {
  let bundleURLs = null;

  if (process.env.NODE_ENV === 'production') {
    bundleURLs = getBundleFileNames();
  } else {
    bundleURLs = {
      js: '/assets/bundle.js',
      css: '/assets/bundle.css'
    };
  }

  if (bundleURLs) {
    Object.keys(bundleURLs).forEach((bundleGroup) => {
      bundleURLs[bundleGroup] = `${process.env.ASSET_DOMAIN || ''}${
        bundleURLs[bundleGroup]
      }`;
    });
  }

  return bundleURLs;
}

export default async function renderIndex() {
  const bundleURLs = getBundleURLs();

  let vendorScripts = '';
  if (bundleURLs.vendor) {
    vendorScripts = `
      <script src="${bundleURLs.runtime}" crossorigin="anonymous"></script>
      <script src="${bundleURLs.vendor}" crossorigin="anonymous"></script>
    `;
  }

  return `
    <!DOCTYPE html>
    <html>
      <!--
        WARNING! Make sure that you match all Quasar related
        tags to the same version! (Below it's "@1.12.13")
      -->

      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <title>My FAA</title>
        <link href="https://cdn.jsdelivr.net/npm/quasar@1.12.13/dist/quasar.min.css" rel="stylesheet" type="text/css">
        <link href="${bundleURLs.css}" rel="stylesheet" type="text/css">
      </head>

      <body>
        <div id="q-app" />
        ${vendorScripts}
        <script src="${bundleURLs.js}" crossorigin="anonymous"></script>
      </body>
    </html>
  `;
}
