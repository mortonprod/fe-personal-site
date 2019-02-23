const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: {
    app: './src/index.js'
  },
  externals: {
    'three': 'THREE',
    'jquery': 'jQuery'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    // new ExtractTextPlugin("styles.css"),
    new MiniCssExtractPlugin({
      filename: `[name].css`
    }),
    new HtmlWebpackPlugin({
      title: 'Production',
      template: 'src/index.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: 'Development',
      filename: 'contact.html',
      template: 'src/contact.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: 'Development',
      filename: 'about.html',
      template: 'src/about.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: 'Development',
      filename: 'service.html',
      template: 'src/service.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      title: 'Development',
      filename: 'timeline.html',
      template: 'src/timeline.html',
      inject: 'body'
    })
    // new CopyWebpackPlugin([ { from: "./src/images/*", to: "./dist"} ])
    // new CopyWebpackPlugin([ { from: "src/images/", to: "images" } ])
  ],
  output: {
    filename: '[name].bundle.js',
    // path: path.resolve(__dirname)
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ] 
        // use: ExtractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: ['css-loader', 'sass-loader']
        // })
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
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          },
        ],
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'all'
    }
  }
};