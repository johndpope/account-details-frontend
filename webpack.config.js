const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// Inlines templates
const htmlLoader = {
  test: /\.html$/,
  loader: 'html-loader?root=.'
};

// Runs eslint before packaging
const eslintLoader = {
  enforce: 'pre',
  test: /\.js$/,
  exclude: [/node_modules/],
  loader: 'eslint-loader'
};

// Runs eslint before packaging
const jshintLoader = {
  enforce: 'pre',
  test: /\.js$/,
  exclude: [/node_modules/],
  loader: 'jshint-loader'
};

// Packages our code and processes using babel
const babelLoader = {
  test: /\.js$/,
  exclude: [/node_modules/],
  loader: 'babel-loader'
};

const webpackModule = {
  rules: [
    htmlLoader,
    // jshintLoader,
    eslintLoader,
    babelLoader,
  ]
};

const webpackExternals = [{
  angular: 'angular',
  'angular-mocks': 'angular-mocks'
}];

const webpackOptimizationPlugins = {
  minimizer: [new UglifyJsPlugin({
    uglifyOptions: {
      include: /\.min\.js$/,
      mangle: true,
      ie8: false,
      warnings: false,
      output: {
        beautify: false,
        indent_level: 2
      },
    },
  })],
};

const distBuild = {
  entry: {
    'dist/js/account-details': './src/index.js',
    'dist/js/account-details.min': './src/index.js'
  },
  output: {
    path: path.join(__dirname, ''),
    filename: '[name].js'
  },
  externals: webpackExternals,
  module: webpackModule,
  optimization: webpackOptimizationPlugins,
};

const docsBuild = {
  entry: {
    'docs/lib/account-details': './src/index.js',
    'docs/lib/demo': './src/demo.js'
  },
  output: {
    path: path.join(__dirname, ''),
    filename: '[name].js'
  },
  externals: webpackExternals,
  module: webpackModule,
  plugins: []
};

module.exports = [distBuild, docsBuild];
