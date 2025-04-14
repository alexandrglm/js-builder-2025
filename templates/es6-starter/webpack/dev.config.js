/*
2025 Breaking changes fixes:
-> From old "webpackmerge" to " { merge }"

-> "HotModuleReplacementPlugin" was deprecated. Needed to add new packages:
  * @pmmmwh/react-refresh-webpack-plugin
  * css-minimizer-webpack-plugin 
  * terser-webpack-plugin


-> Then, "HotModuleReplacementPlugin" -> to "ReactRefreshWebpackPlugin" code calls changes done
-> 'devServer' configs and calls updates to Webpack 5
-> SourceMaps / Asssets confs. fixed
   

PENDING TO FIX:
$ npm start

> es6-starter@1.0.0 start
> webpack serve --config webpack/dev.config.js --watch

[webpack-cli] No need to use the 'serve' command together with '{ watch: true | false }' or '--watch'/'--no-watch' configuration, it does not make sense.
[webpack-cli] Invalid options object. Dev Server has been initialized using an options object that does not match the API schema.
 - options.proxy should be an array:
   [object { … } | function, ...]
   -> Allows to proxy requests, can be useful when you have a separate API backend development server and you want to send API requests on the same domain.
   -> Read more at https://webpack.js.org/configuration/dev-server/#devserverproxy
*/

const path = require('path');
// new webpack.merge method
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
    watchFiles: ['src/**/*', 'static/**/*'],
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
    proxy: proxyRules
  }
});
