const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#181818',
      '@layout-header-background': 'rgba(0,0,0,0.41)',
      '@body-background': '#000000',
      '@layout-body-background': 'black',
      '@menu-dark-item-active-bg': 'transparent',
      '@menu-dark-bg': 'transparent',
    }
  }),
);
