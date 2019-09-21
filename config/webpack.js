const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer');

const BUILD_PATH = path.resolve(__dirname, '../build');
const PUBLIC_PATH = '/';

module.exports = {
  devtool: 'source-map',
  entry: path.resolve(__dirname, '../client/src/index.jsx'),
  output: {
    path: BUILD_PATH,
    publicPath: PUBLIC_PATH,
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
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: true },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[folder]__[local]--[hash:base64:5]',
              },
              sourceMap: true,
              import: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [autoprefixer]
            },
          },
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './client/src/assets/stylesheets/resources/**/*.scss',
            },
          },
        ]
      },
      {
        test: /\.(svg|png|woff(2)?|ttf|eot)$/,
        loader: 'file-loader',
        options: { limit: 5000000 },
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    // alias: {
    //   '@alias': path.resolve(__dirname, '../path/to/alias'),
    // }
  },
  devServer: {
    contentBase: BUILD_PATH,
    compress: true,
    port: 1337,
    historyApiFallback: true,
    publicPath: PUBLIC_PATH,
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({ template: './client/src/index.html' }),
    new MiniCssExtractPlugin({ filename: '[name].styles.css' })
  ],
}
