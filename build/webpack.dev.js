const path = require('path');
const webpack = require('webpack');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const ENV = 'production';

module.exports = webpackMerge(baseConfig, {
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js'
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 4002,
    inline: true,
    open: true,
    // overlay: { warnings: false, errors: true },
    hot: true,
    watchOptions: {
      aggregateTimeout: 2000,
      poll: 2000,
      ignored: /node_modules/,
      contentBase: [path.join(__dirname, '../src')],
      watchContentBase: true
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new DefinePlugin({
      isDevServer: 'true',
      ENV: JSON.stringify(ENV)
    })
  ]
});
