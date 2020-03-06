/* eslint-disable */
// @ts-check

const webpackConfig = require('./webpack.config');
const path = require('path');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'jasmine-spec-tags'],
    browsers: ['Chrome'],
    files: ['src/test.ts'],
    webpack: webpackConfig,
    port: 9876,
    colors: true,
    logLevel: config.DEBUG,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity,
    preprocessors: {
      'src/test.ts': ['webpack', 'sourcemap'],
    },
    mime: {
      'text/x-typescript': ['ts'],
    },
    client: {
      clearContext: false,
    },
    reporters: ['progress', 'kjhtml', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      reports: ['html', 'text-summary', 'lcovonly'],
      dir: path.join(__dirname, 'coverage'),
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: false,
      'report-config': {
        html: {
          outdir: 'html',
        },
      },
    },
  });
};
