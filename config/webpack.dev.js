const webpack = require('webpack');
const { merge } = require('webpack-merge');
const apiMocker = require('mocker-api');
const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const commonConfig = require('./webpack.common.js');

const config = merge(commonConfig, {
  target: 'web',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://localhost:9001`]
      },
      clearConsole: true,
    })
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9001,
    hot: true,
    quiet: true,
    open: true,
    compress: true,
    before(app) {
      console.log(process.env.npm_lifecycle_event)
      if (process.env.npm_lifecycle_event === 'start:mock') {
        apiMocker(app, path.resolve(__dirname, '../mock/index.js'))
      }
    },
  }
});

if (process.env.npm_lifecycle_event === 'start') {
  config.devServer.proxy = {
    '/platform': 'http://159.75.145.86:8201',
  }
}

module.exports = config;
