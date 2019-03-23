const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    index: [path.join(__dirname, 'index.tsx')],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
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
