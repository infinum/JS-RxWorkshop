const webpackConfig = require('./webpack.config');
const path = require('path');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    browsers: ['Chrome'],
    files: ['src/test.ts'],
    webpack: webpackConfig,
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity,
    preprocessors: {
      'src/test.ts': ['webpack'],
    },
    mime: {
      'text/x-typescript': ['ts'],
    },
    client: {
      clearContext: false,
    },
    logLevel: config.LOG_DEBUG,
    reporters: ['progress', 'kjhtml', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      reports: ['html', 'text-summary', 'lcovonly'],
      dir: path.join(__dirname, 'coverage'),
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: false,
      'report-config': {
        html: {
          outdir: 'html'
        }
      }
    }
  });
};
