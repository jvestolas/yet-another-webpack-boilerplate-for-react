const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const BUILD_PATH = path.resolve(__dirname, '../build');

module.exports = {
  devtool: 'source-map',
  entry: path.resolve(__dirname, '../client/src/index.jsx'),
  output: {
    path: BUILD_PATH,
    publicPath: '/',
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
                localIdentName: '[folder]__[name]__[local]--[hash:base64:5]',
              },
              sourceMap: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                require('autoprefixer')
              ]
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
    watchContentBase: true,
    watchOptions: {
      poll: true,
    },
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({ template: './client/src/index.html' }),
    new MiniCssExtractPlugin({ filename: '[name].styles.css' })
  ],
}
