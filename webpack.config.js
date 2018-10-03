const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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

const jsonLoader = {
  test: /\.json$/,
  exclude: [/node_modules/],
  loader: 'json-loader'
};

const webpackModule = {
  rules: [
    htmlLoader,
    // jshintLoader,
    eslintLoader,
    babelLoader,
    jsonLoader
  ]
};

const webpackExternals = [{
  angular: 'angular',
  'angular-mocks': 'angular-mocks'
}];

const webpackPlugins = [
  new UglifyJSPlugin({
    include: /\.min\.js$/,
    ie8: false,
    ecma: 6,
    mangle: true,
    output: {
      beautify: false,
      indent_level: 2
    },
    compress: true,
    warnings: false
  })
];

module.exports = [{
  entry: {
    'dist/js/account-details': './src/index.js',
    'dist/js/account-details.min': './src/index.js',
    'demo/lib/account-details': './src/index.js',
    'demo/lib/demo': './src/demo.js'
  },
  output: {
    path: path.join(__dirname, ''),
    filename: '[name].js'
  },
  externals: webpackExternals,
  module: webpackModule,
  plugins: webpackPlugins
}];
