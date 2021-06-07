const os = require('os');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HappyPack = require('happypack');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const WebpackBar = require('webpackbar');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const srcDir = path.join(__dirname, '../src');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: process.env.NODE_ENV,
  stats: 'errors-only',
  entry: {
    main: path.join(__dirname, '../src/index.js'),
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].[chunkhash:8].js',
    chunkFilename: 'chunk/[name].[chunkhash:8].js',
  },
  resolve: {
    alias: {
      '@': srcDir,
      '@page': path.resolve(srcDir, './pages'),
      '@components': path.resolve(srcDir, './components'),
    },
    extensions: ['.js', '.jsx', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: ['happypack/loader?id=happybabel'],
      },
      {
        test: /\.scss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.less$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: ['url-loader'],
        include: [srcDir],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: ['url-loader'],
        include: [srcDir],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: ['url-loader'],
        include: [srcDir],
      },
    ]
  },
  plugins: [
    new HappyPack({
      id: 'happybabel',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      title: '管理系统',
      templateParameters: {
        'PUBLIC_URL': 'public'
      }
    }),
    new AntdDayjsWebpackPlugin(),
    new WebpackBar(),
  ]
}
