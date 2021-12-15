const path = require('path');

module.exports = [{
  mode: 'development',
  entry: {
    first: ['./src/first.js'],
  },
  devtool: 'source-map',
  devServer: {
    port: 9000,
    static: 'dist',
    hot: true
  },
  output: {
    uniqueName: 'first',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}, {
  target: 'web',
  mode: 'development',
  entry: {
    second: ['./src/second.js'],
  },
  devtool: 'source-map',
  output: {
    uniqueName: 'second',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}]