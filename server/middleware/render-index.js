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

  const ASSET_DOMAIN = `${process.env.ASSET_DOMAIN || ''}/assets/`;

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
        <link rel="apple-touch-icon" sizes="57x57" href="${ASSET_DOMAIN}icons/apple-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="${ASSET_DOMAIN}icons/apple-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="${ASSET_DOMAIN}icons/apple-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="${ASSET_DOMAIN}icons/apple-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="${ASSET_DOMAIN}icons/apple-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="${ASSET_DOMAIN}icons/apple-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="${ASSET_DOMAIN}icons/apple-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="${ASSET_DOMAIN}icons/apple-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="${ASSET_DOMAIN}icons/apple-icon-180x180.png">
        <link rel="icon" type="image/png" sizes="192x192"  href="${ASSET_DOMAIN}icons/android-icon-192x192.png">
        <link rel="icon" type="image/png" sizes="32x32" href="${ASSET_DOMAIN}icons/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="96x96" href="${ASSET_DOMAIN}icons/favicon-96x96.png">
        <link rel="icon" type="image/png" sizes="16x16" href="${ASSET_DOMAIN}icons/favicon-16x16.png">
        <link rel="manifest" href="${ASSET_DOMAIN}icons/manifest.json">
        <meta name="msapplication-TileColor" content="#ffffff">
        <meta name="msapplication-TileImage" content="${ASSET_DOMAIN}icons/ms-icon-144x144.png">
        <meta name="theme-color" content="#ffffff">
        <title>My FAA</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons" rel="stylesheet" type="text/css">
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
