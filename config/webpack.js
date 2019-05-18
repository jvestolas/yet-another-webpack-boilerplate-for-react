const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST_PATH = path.resolve(__dirname, 'dist');

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
      // {
      //   test: /\.scss$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: [
      //       'css-loader',
      //       {
      //         loader: 'postcss-loader',
      //         options: {
      //           sourceMap: true,
      //           config: { path: path.resolve(__dirname, './postcss.config.js') },
      //         },
      //       },
      //       'sass-loader',
      //       {
      //         loader: 'sass-resources-loader',
      //         options: {
      //           resources: [
      //             './client/src/stylesheets/shared/_constants.scss',
      //             './client/src/stylesheets/shared/_mixins.scss'
      //           ]
      //         },
      //       },
      //     ],
      //   }),
      // },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: DIST_PATH,
    port: 1337,
    historyApiFallback: true,
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({ template: './client/src/index.html' }),
  ],
}
