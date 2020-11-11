const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: {
    index: './src/js/index.js',
    index_head: './src/sass/index.js'
  },
  externals: {
    'three': 'THREE',
    'jquery': 'jQuery'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: `[name].css`
    }),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: 'src/index.html',
      chunks: ["index_head"]

    }),
    new HtmlWebpackPlugin({
      title: 'Development',
      filename: 'contact.html',
      template: 'src/contact.html',
      chunks: ["index_head","index"],
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: 'Development',
      filename: 'about.html',
      template: 'src/about.html',
      chunks: ["index_head"],
      inject: 'body'
    }),
    new CopyWebpackPlugin([ { from: "src/images/poster.pdf", to: "images" } ]),
    new CopyWebpackPlugin([ { from: "src/images/favicon.ico", to: "." } ])
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader'
        }
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              }
            }
          },
        ],
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'all'
    }
  }
};