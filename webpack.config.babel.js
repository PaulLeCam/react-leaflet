import path from 'path';
import webpack from 'webpack';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';

const outputPath = path.resolve(__dirname, 'dist');

const lodashFeatures = {
  caching: true,
  collections: true,
};

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
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: ['dev-expression', 'lodash', 'transform-proto-to-assign'],
          presets: [
            [
              'es2015',
              {
                loose: true,
                modules: false,
              },
            ],
            'react',
            'stage-1',
          ],
        },
      },
    ],
  },
};

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
      new LodashModuleReplacementPlugin(lodashFeatures),
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
      new webpack.LoaderOptionsPlugin({
        minimize: true,
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new LodashModuleReplacementPlugin(lodashFeatures),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          dead_code: true,
          warnings: false,
        },
      }),
    ],
  },
];
