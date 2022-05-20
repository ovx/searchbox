const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BannerPlugin = require('webpack').BannerPlugin;
const path = require('path');
const fs = require('fs');
const sveltePreprocess = require('svelte-preprocess');

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
  entry: {
    'dist/demo.min': ['./src/demo.ts'],
    'dist/searchbox.min': ['./src/main.ts'],
    'dist/searchbox.worker.min': ['./src/worker/main.ts'],
  },
  resolve: {
    alias: {
      svelte: path.dirname(require.resolve('svelte/package.json')),
    },
    extensions: ['.mjs', '.js', '.ts', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  output: {
    path: __dirname,
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            compilerOptions: {
              dev: !prod,
            },
            emitCss: true,
            hotReload: !prod,
            preprocess: sveltePreprocess({
              sourceMap: !prod,
            }),
          },
        },
      },
      {
        // required to prevent errors from Svelte on Webpack 5+
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  mode,
  plugins: [
    new BannerPlugin({
      banner: fs
        .readFileSync(path.join(__dirname, 'license-banner.txt'), 'utf8')
        .replace('{version}', process.env.npm_package_version),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  performance: {
    hints: false,
  },
  devtool: 'source-map',
  devServer: {
    allowedHosts: 'all',
    static: [
      {
        directory: path.join(__dirname, 'public'),
      },
      {
        directory: path.join(__dirname, 'demo'),
        publicPath: '/searchbox/demo',
      },
    ],
    hot: true,
    host: '0.0.0.0',
    port: 3003,
  },
};
