const CracoLessPlugin = require('craco-less');
const lessModuleRegex = /\.module\.less$/;
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) =>
          constructor && constructor.name === "ModuleScopePlugin"
      );

      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
      return webpackConfig;
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {

        // less loader options
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },

        // A callback function that receives two arguments: the webpack rule, 
        // and the context. You must return an updated rule object.
        modifyLessRule: (lessRule, context) => {
          lessRule.test = lessModuleRegex;
          lessRule.exclude = /node_modules|antd\.css/;
          return lessRule;
        },

        // Passing an options object to configure the css-loaders
        cssLoaderOptions: {
          modules: { localIdentName: "[local]_[hash:base64:5]" },
        },

      },
    },
  ],
};

