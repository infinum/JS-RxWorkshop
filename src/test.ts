declare var require: any;

const testsContext = require.context(".", true, /\.spec.ts$/);
testsContext.keys().forEach(testsContext);

const srcContext = require.context("../src", true, /\.ts$/);
srcContext.keys().forEach(srcContext);
