const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');


module.exports = {
  entry: path.resolve(__dirname, '../../src/index.tsx'),
  output: {
    filename: 'javascripts/react-mui/[name].js',
    path: path.resolve(__dirname, '../../../app/assets/'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.less'],
    modules: [path.resolve('./src'), path.join(__dirname, '../'), 'node_modules'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.[jt]s?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader' }],
      },
    ],
    // rules: [
    //   {
    //     test: /\.(js)x?$/,
    //     exclude: /node_modules/,
    //     use: {
    //       loader: 'babel-loader',
    //     },
    //   },
    //   {
    //     test: /\.(ts|tsx)?$/,
    //     loader: 'ts-loader',
    //     exclude: /node_modules/,
    //   },
    //   {
    //     test: /\.css$/,
    //     use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader' }],
    //   },
    //   {
    //     test: /\.less$/,
    //     use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader' }, { loader: 'less-loader' }],
    //   },
    //   {
    //     test: /\.(sass|scss)$/,
    //     use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
    //   },
    // ],
  },
  plugins: [new MiniCssExtractPlugin({
    filename: 'stylesheets/react-mui/[name].css',
  })]
  // plugins: [
  //   new webpack.ContextReplacementPlugin(/moment\/locale$/, /fi|sv/),
  //   new webpack.ContextReplacementPlugin(/i18n-iso-countries\/langs$/, /en|fi|sv/),
  //   new MiniCssExtractPlugin({
  //     filename: 'stylesheets/react-mui/[name].css',
  //   }),
  // ],
};
