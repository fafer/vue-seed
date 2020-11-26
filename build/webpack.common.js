const path = require('path');
const conf = require('./conf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

function loader() {
  return process.env.MOCK_DATA === 'mock'
    ? [{ loader: 'mock-loader', options: { enable: true } }]
    : [];
}

module.exports = {
  entry: conf.getEntry(),
  output: {
    filename: '[name].js',
    chunkFilename: 'chunk/[name].js?v=[contenthash:8]',
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        include: [path.join(__dirname, '../src'), __dirname],
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        test: /\.vue$/,
        use: ['vue-loader', ...loader()],
      },
      {
        test: /\.js$/,
        use: ['babel-loader', ...loader()],
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: (loader) => [
                  require('postcss-import')({ root: loader.resourcePath }),
                  require('postcss-preset-env')(),
                  require('cssnano')(),
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|svg|eot|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name(filePath) {
                const temp = filePath
                  .replace(conf.SRC_PATH, '')
                  .replace(path.posix.resolve(__dirname, '../node_modules'), '')
                  .substring(1)
                  .replace(/\\/g, '/')
                  .replace(/\//g, conf.ENTRY_SEPERATE)
                  .toLocaleLowerCase();
                return temp;
              },
              limit: 100000,
              publicPath:
                process.env.NODE_ENV === 'production'
                  ? conf.IMGPUBLICPATH
                  : conf.BASEPATH,
              emitFile: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name(filePath) {
                const temp = filePath
                  .replace(conf.SRC_PATH, '')
                  .replace(path.posix.resolve(__dirname, '../node_modules'), '')
                  .substring(1)
                  .replace(/\\/g, '/')
                  .replace(/\//g, conf.ENTRY_SEPERATE)
                  .toLocaleLowerCase();
                return temp;
              },
              limit: 8192,
              publicPath:
                process.env.NODE_ENV === 'production'
                  ? conf.IMGPUBLICPATH
                  : conf.BASEPATH,
              emitFile: true,
            },
          },
        ],
      },
    ],
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loaders')],
  },
  resolve: {
    extensions: ['.js', '.json', '.vue', '.css', '.scss'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': conf.SRC_PATH,
    },
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require(path.join(conf.COPY_PATH, 'vendor-manifest.json')),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: conf.COPY_PATH,
          to: conf.COPY_DEST_PATH,
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: 'chunk/[name].css?v=[contenthash:8]',
    }),
    new VueLoaderPlugin(),
  ],
};
