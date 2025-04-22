/* 
* FIXES
*
* SplitChunkPlugin callbacks from webpack
* WebPack loader new syntax/types for served filetypes (JSON, AUDIO, VIDEO, IMG,etc)
* New Chunks management with updated method (optimizitation) and syntax
* Server timeout for serving files reduced
* Parsed export default from old object -> to Array
*/

export default {
  entry: {
    app: {
      import: './src/bootstrap.js',
      dependOn: 'vendors'
    },
    vendors: './src/vendor.js'
  },

  resolve: {
    extensions: ['.js', '.scss'],
    modules: ['node_modules']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.json$/,
        type: 'json'
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(mp4|webm)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10000
          }
        }
      }
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};
