/*
FIXED TO 2025

Pendning to explain changes
*/

const path = require('path');
const { merge } = require('webpack-merge');
const webpackCommon = require('./common.config');

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(webpackCommon, {
  bail: true,
  devtool: 'source-map',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
                       filename: '[name]-[contenthash].min.js',
                       chunkFilename: '[id]-[contenthash].js',
                       publicPath: '/',
                         assetModuleFilename: '[name]-[hash][ext]'
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
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

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            warnings: false
          },
          output: {
            comments: false
          }
        },
        extractComments: false
      }),
      new CssMinimizerPlugin()
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../static/index.html'),
                          favicon: path.resolve(__dirname, '../static/favicon.ico'),
                          minify: {
                            removeComments: true,
                            collapseWhitespace: true,
                            removeRedundantAttributes: true,
                            useShortDoctype: true,
                            removeEmptyAttributes: true,
                            removeStyleLinkTypeAttributes: true,
                            keepClosingSlash: true,
                            minifyJS: true,
                            minifyCSS: true,
                            minifyURLs: true
                          }
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
                   globOptions: {
                     ignore: ['**/index.html', '**/favicon.ico']
                   }
        }
      ]
    }),
    new CleanWebpackPlugin(),
                       new DefinePlugin({
                         'process.env': {
                           NODE_ENV: JSON.stringify('production')
                         }
                       }),
                       new MiniCssExtractPlugin({
                         filename: '[name]-[contenthash].min.css'
                       })
  ]
});

