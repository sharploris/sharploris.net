// next.config.js
const _path = require("path");
const withSass = require('@zeit/next-sass');
const fetch = require('isomorphic-unfetch');

module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
    getLocalIdent: (loaderContext, localIdentName, localName, options) => {
      const fileName = _path.basename(loaderContext.resourcePath);
      const name = fileName.replace(/\.[^/.]+$/, "")

      if (name.endsWith('.module')) {
        return defaultGetLocalIdent(loaderContext, localIdentName, localName, options);
      }

      return localName;
    }
  },
  exportTrailingSlash: true,
  exportPathMap: async function() {
    const paths = {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/people': { page: '/people' }
    }

    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
    const data = await res.json();
    const shows = data.map(entry => entry.show);

    shows.forEach(show => {
      paths[`/post/${show.id}`] = { page: '/post/[id]', query: { id: show.id } };
    });

    return paths;
  }
})

// Code lifted and modified from CSS loader - for generating hashes from localIdentName
const _loaderUtils = require("loader-utils");
const _normalizePath = require("normalize-path");
const _cssesc = require("cssesc");
const filenameReservedRegex = /[<>:"/\\|?*\x00-\x1F]/g; // eslint-disable-next-line no-control-regex
const reControlChars = /[\u0000-\u001f\u0080-\u009f]/g;
const reRelativePath = /^\.+/;
const defaultGetLocalIdent = (loaderContext, localIdentName, localName, options) => {
  if (!options.context) {
    // eslint-disable-next-line no-param-reassign
    options.context = loaderContext.rootContext;
  }

  const request = (0, _normalizePath)(_path.relative(options.context || '', loaderContext.resourcePath)); // eslint-disable-next-line no-param-reassign

  options.content = `${options.hashPrefix + request}+${unescape(localName)}`; // Using `[path]` placeholder outputs `/` we need escape their
  // Also directories can contains invalid characters for css we need escape their too

  return (0, _cssesc)(_loaderUtils.interpolateName(loaderContext, localIdentName, options) // For `[hash]` placeholder
  .replace(/^((-?[0-9])|--)/, '_$1').replace(filenameReservedRegex, '-').replace(reControlChars, '-').replace(reRelativePath, '-').replace(/\./g, '-'), {
    isIdentifier: true
  }).replace(/\\\[local\\\]/gi, localName);
};
