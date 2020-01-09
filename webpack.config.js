const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const appPath = path.resolve(__dirname, 'src');

module.exports = (env) => {
  const { prod = false } = env;

  return {
    mode: prod ? 'production' : 'development',
    entry: appPath,

    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
        },
      ],
    },
    devServer: {
      port: 9000,
      open: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.join(appPath, 'index.html'),
      }),
      new ForkTsCheckerWebpackPlugin(),
    ],
  };
};
