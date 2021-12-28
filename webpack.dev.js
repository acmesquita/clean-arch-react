/** @type {import('webpack').Configuration} */
const { DefinePlugin } = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')

const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { modules: true } },
          { loader: 'sass-loader' }
        ],
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    devMiddleware: {
      writeToDisk: true
    },
    static: {
      directory: './dist'
    },
    historyApiFallback: true,
    port: 8080
  },
  plugins: [
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify('https://fordevs.herokuapp.com/api')
    }),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './template.dev.html'
    })
  ]
})
