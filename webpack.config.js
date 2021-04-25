const webpack = require('webpack');
const path = require('path');
const RemovePlugin = require('remove-files-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const buildPath = path.resolve(__dirname, 'dist');

const client = {
  entry: __dirname + '/src/client/client.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ESLintPlugin(),
    new RemovePlugin({
      before: {
        include: [
          path.resolve(buildPath, 'client')
        ]
      },
      watch: {
        include: [
          path.resolve(buildPath, 'client')
        ]
      }
    })
  ],
  optimization: {
    minimize: false
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'main.client.js',
    path: path.resolve(buildPath, 'client'),
  },
};

module.exports = [client];
