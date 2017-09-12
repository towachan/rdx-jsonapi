const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const EncodingPlugin = require('webpack-encoding-plugin')
const path = require('path')

const config = {
  entry: ['babel-polyfill', './src/index.jsx'],

  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'es2015', 'react'],
            plugins: [
              'transform-object-assign',
              'transform-decorators-legacy',
              'transform-object-rest-spread'
            ],
            compact: false
          }
        }
      },
      {
        test: /.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf|ico)(\?v=\d+\.\d+\.\d+)?$/,
        use: ['url-loader?limit=100000']
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      filename: 'index.html',
    }),
    new EncodingPlugin({ encoding: 'utf8' }),
    new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery'})
  ],

  devServer: {
    inline: true,
    port: 7778
  },

  devtool: 'eval'
}

module.exports = config
