const path = require('path');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const baseConfig = require('./webpack.base.js');
const ENV = 'production';

module.exports = webpackMerge(baseConfig, {
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        include: [path.resolve(__dirname, '../src/styles')]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        include: [path.resolve(__dirname, '../src/styles')]
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      isDevServer: 'false',
      ENV: JSON.stringify(ENV)
    }),
    new MiniCssExtractPlugin({ filename: '[name][hash].css', chunkFilename: '[name][chunkhash].css' })
  ]
});
