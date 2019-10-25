const path = require('path')

const config = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
  },
  devServer: {
    // eslint-disable-next-line no-undef
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
}

// eslint-disable-next-line no-undef
module.exports = config