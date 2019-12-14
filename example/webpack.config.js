const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    index: [path.join(__dirname, 'index.js')],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  output: {
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: __dirname,
    port: 8000,
  },
}
