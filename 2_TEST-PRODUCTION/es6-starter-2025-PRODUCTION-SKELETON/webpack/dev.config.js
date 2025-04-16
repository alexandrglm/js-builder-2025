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
*/

const path = require('path');
const { merge } = require('webpack-merge');
const webpackCommon = require('./common.config');

const env = require('../env');
const proxyRules = require('../proxy/rules');

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = merge(webpackCommon, {
  devtool: 'eval-cheap-module-source-map',
  mode: 'development',
  output: {
    path: path.resolve
    (__dirname, '../static/dist'),
    filename: '[name].js',
    chunkFilename: '[id]-chunk.js',
    publicPath: '/',
    assetModuleFilename: '[name][ext]'
  },

  module: {
    /*
     * New array format and new props-attrbs. including:
     * 
     * 
     * 
     * 
    */ 
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
          // explicit sass type inclusion
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
      template: path.resolve
      (__dirname, '../static/index.html'),
      favicon: path.resolve(__dirname, '../static/favicon.ico')
    }),
    // old HotModuleReplacement callback
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
    // OLD: proxy: Array.isArray(proxyRules) ? proxyRules : [proxyRules]
    proxy: require('../proxy/rules')
  },
  
});
