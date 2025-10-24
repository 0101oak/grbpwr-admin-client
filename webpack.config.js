const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { BundleStatsWebpackPlugin } = require('bundle-stats-webpack-plugin');
const webpackDev = require('./webpack.dev');
const Dotenv = require('dotenv-webpack');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    filename: isProduction ? '[name].[contenthash].js' : '[name].js',
    path: path.resolve(__dirname, 'dist/'),
    publicPath: isProduction ? './' : '/',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [new TsConfigPathsPlugin()],
    alias: {
      'react-slick$': 'react-slick',
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ? '[name].[contenthash].css' : '[name].css',
    }),
    new BundleStatsWebpackPlugin(),
    new Dotenv(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 500000,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        // Large libraries in separate chunks
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
          name: 'react-vendor',
          priority: 10,
          chunks: 'all',
        },
        query: {
          test: /[\\/]node_modules[\\/]@tanstack[\\/]react-query[\\/]/,
          name: 'query-vendor',
          priority: 10,
          chunks: 'all',
        },
        ui: {
          test: /[\\/]node_modules[\\/](antd|@ant-design)[\\/]/,
          name: 'ui-vendor',
          priority: 10,
          chunks: 'all',
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10,
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          priority: -30,
          chunks: 'all',
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: {
      name: 'runtime',
    },
  },
  performance: {
    hints: isProduction ? 'warning' : false,
    maxAssetSize: 512000, // 500 KiB
    maxEntrypointSize: 512000, // 500 KiB
  },
  // Conditionally add development configurations
  ...(isProduction ? {} : webpackDev),
};
