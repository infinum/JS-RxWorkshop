/* eslint-disable no-var */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare var require: any;

const testsContext = require.context('.', true, /\.spec.ts$/);
testsContext.keys().forEach(testsContext);

const srcContext = require.context('../src', true, /\.ts$/);
srcContext.keys().forEach(srcContext);
