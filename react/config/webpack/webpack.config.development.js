const { merge } = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const config = require('./webpack.config.base');

const GLOBALS = {
  'process.env.ENDPOINT': JSON.stringify(process.env.ENDPOINT || 'http://localhost:3000'),
};

module.exports = merge(config, {
  cache: true,
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    // static: path.join(__dirname, '../../src/public'),
    historyApiFallback: true,
    // host: process.env.HOST || '127.0.0.1',
    hot: true,
    port: process.env.PORT || 8000,
  },
  rules: [
    {
      test: /\.[jt]sx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        plugins: ['react-refresh/babel'],
      },
    },
    {
      test: /\.[jt]s?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        plugins: ['react-refresh/babel'],
      },
    },
    {
      test: /\.css$/,
      use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader' }],
    },
  ],
  plugins: [new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/public/index.html",
      hash: true,
      filename: 'index.html'
    }), ],
  //   new HtmlWebpackPlugin({
  //     template: 'src/public/index.html',
  //     filename: 'index.html',
  //     favicon: 'src/public/favicon.ico',
  //   }),
  //   new webpack.HotModuleReplacementPlugin(),
  //   new webpack.DefinePlugin(GLOBALS),
  // ],
});
