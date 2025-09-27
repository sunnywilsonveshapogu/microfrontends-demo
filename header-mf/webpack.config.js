const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'development',
  devServer: {
    port: 3001,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'headerMf',
      filename: 'remoteEntry.js',
      exposes: {
        './Header': './src/Header',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.2.0',
          import: 'react',
          shareKey: 'react',
          shareScope: 'default',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.2.0',
          import: 'react-dom',
          shareKey: 'react-dom',
          shareScope: 'default',
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};