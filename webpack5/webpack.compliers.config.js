const path = require('path');

module.exports = [{
  mode: 'development',
  entry: {
    first: ['./src/first.js'],
  },
  optimization: {
    runtimeChunk: true
  },
  devtool: 'source-map',
  devServer: {
    port: 9000,
    static: 'dist',
    hot: true
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}, {
  mode: 'development',
  entry: {
    second: ['./src/second.js'],
  },
  optimization: {
    runtimeChunk: true
  },
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}]