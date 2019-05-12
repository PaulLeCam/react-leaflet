import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'

const env = process.env.NODE_ENV

const config = {
  input: 'src/index.js',
  output: {
    file:
      env === 'production'
        ? 'dist/react-leaflet.min.js'
        : 'dist/react-leaflet.js',
    format: 'umd',
    globals: {
      leaflet: 'L',
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    name: 'ReactLeaflet',
  },
  external: ['leaflet', 'react', 'react-dom'],
  plugins: [
    nodeResolve(),
    babel({
      exclude: '**/node_modules/**',
      runtimeHelpers: true,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
    commonjs(),
  ],
}

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        dead_code: true,
      },
    })
  )
}

export default config
