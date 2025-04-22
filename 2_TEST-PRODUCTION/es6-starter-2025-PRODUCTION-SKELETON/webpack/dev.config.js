/*
 * 2025 Breaking changes fixes:
 * From old "webpackmerge"import method to ES6 " { merge }" mode.
 *  "HotModuleReplacementPlugin" was deprecated. Needed to add new packages:
 *    @pmmmwh/react-refresh-webpack-plugin
 *    css-minimizer-webpack-plugin 
 *    terser-webpack-plugin
 *
 * "HotModuleReplacementPlugin" -> parsed to "ReactRefreshWebpackPlugin" c
 * 'devServer' configs and calls updates to Webpack 5
 * SourceMaps / Asssets confs. fixed
 * Removed --watch from packahge.json as long as --watch is "included" when "serve"-ing
 * 
 * Modules syntax really  parsed to ES6/7
*/





import path from 'path'
//const path = require('path');

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { merge } from 'webpack-merge'
// const { merge } = require('webpack-merge');

import webpack from 'webpack';
const { DefinePlugin } = webpack;
// const { DefinePlugin} = require('webpack')

import HtmlWebpackPlugin from 'html-webpack-plugin'
// const = require('html-webpack-plugin');
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');


import webpackCommon from './common.config.js';
// const webpackCommon = require('./common.config');
import  env from '../env.js'
import proxyRules from '../proxy/rules.js'
//const env = require('../env');
//const proxyRules = require('../proxy/rules');

//  __dirname is not defined
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)




export default merge(webpackCommon, {
  devtool: 'eval-cheap-module-source-map',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../static/dist'),
    filename: '[name].js',
    chunkFilename: '[id]-chunk.js',
    publicPath: '/',
    assetModuleFilename: '[name][ext]'
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../static/index.html'),
                          favicon: path.resolve(__dirname, '../static/favicon.ico')
    }),
    new ReactRefreshWebpackPlugin()
  ],

  devServer: {
    host: env.devServer.host || 'localhost',
    port: env.devServer.port || 3000,
    static: {
      directory: path.resolve(__dirname, '../static')
    },
    compress: true,
    hot: true,
    historyApiFallback: {
      disableDotRule: true
    },
    client: {
      overlay: {
        errors: true,
        warnings: true
      }
    },
    proxy: Array.isArray(proxyRules) ? proxyRules : [proxyRules]
  }
})
