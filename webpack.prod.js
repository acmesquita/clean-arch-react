const { DefinePlugin } = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconWebpackPlugin = require('favicons-webpack-plugin')
const { merge } = require('webpack-merge')

const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
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
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { modules: true } },
          { loader: 'sass-loader' }
        ],
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
    axios: 'axios'
  },
  plugins: [
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify('https://fordevs.herokuapp.com/api')
    }),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './template.prod.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'main-bundle-[hash].css'
    }),
    new FaviconWebpackPlugin({
      logo: './public/favicon.png'
    })
  ]
})