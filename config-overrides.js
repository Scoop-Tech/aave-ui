const { useBabelRc, addBabelPlugin, override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  useBabelRc(),
  addBabelPlugin(['styled-jsx/babel', { plugins: ['styled-jsx-plugin-sass'] }]),
  addWebpackAlias({
    '@aave/aave-ui-kit': path.resolve('./src/aave/aave-ui-kit'),
  })
);
