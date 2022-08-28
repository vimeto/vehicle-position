const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');

const TerserPlugin = require('terser-webpack-plugin');

const config = require('./webpack.config.base');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  'process.env.ENDPOINT': JSON.stringify(process.env.ENDPOINT || 'http://localhost:3000'),
};

module.exports = merge(config, {
  mode: 'production',
  stats: 'errors-only',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.LoaderOptionsPlugin({ minimize: true }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
});
