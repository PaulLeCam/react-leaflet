import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify'

const env = process.env.NODE_ENV
const extensions = ['.js', '.ts', '.tsx']

const config = {
  input: 'src/index.ts',
  output: {
    file:
      env === 'production'
        ? 'umd/react-leaflet.min.js'
        : 'umd/react-leaflet.js',
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
    resolve({
      browser: true,
      extensions,
    }),
    commonjs(),
    babel({
      exclude: '**/node_modules/**',
      extensions,
      runtimeHelpers: true,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
}

if (env === 'production') {
  config.plugins.push(uglify())
}

export default config
