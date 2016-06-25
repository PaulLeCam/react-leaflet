import path from 'path'
import webpack from 'webpack'
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'

const outputPath = path.resolve(__dirname, 'dist')

const config = {
  entry: {
    lib: './src/index',
  },
  externals: [
    {
      leaflet: {
        amd: 'leaflet',
        commonjs: 'leaflet',
        commonjs2: 'leaflet',
        root: 'L',
      },
    },
    {
      react: {
        amd: 'react',
        commonjs: 'react',
        commonjs2: 'react',
        root: 'React',
      },
    },
    {
      'react-dom': {
        amd: 'react-dom',
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        root: 'ReactDOM',
      },
    },
  ],
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
    ],
  },
}

export default [
  {
    ...config,
    output: {
      filename: 'react-leaflet.js',
      library: 'ReactLeaflet',
      libraryTarget: 'umd',
      path: outputPath,
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
      new LodashModuleReplacementPlugin(),
    ],
  },
  {
    ...config,
    output: {
      filename: 'react-leaflet.min.js',
      library: 'ReactLeaflet',
      libraryTarget: 'umd',
      path: outputPath,
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new LodashModuleReplacementPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          dead_code: true,
          warnings: false,
        },
      }),
    ],
  },
]
