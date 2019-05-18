const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const DIST_PATH = path.resolve(__dirname, '../dist');

module.exports = {
  devtool: 'source-map',
  entry: path.resolve(__dirname, '../client/src/index.jsx'),
  output: {
    path: DIST_PATH,
    filename: 'client.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[folder]--[name]--[hash:base64:5]',
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                config: { path: path.resolve(__dirname, './postcss.config.js') },
              },
            },
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: path.resolve(__dirname, '../client/src/stylesheets/_colors.scss')
              },
            },
          ],
        }),
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
  devServer: {
    contentBase: DIST_PATH,
    port: 1337,
    historyApiFallback: true,
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({ template: './client/src/index.html' }),
    new ExtractTextPlugin({ filename: 'style_[hash].css' }),
  ],
}
