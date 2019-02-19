const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
    new HtmlWebpackPlugin({
      title: 'Production',
      template: 'src/index.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      title: 'Development',
      filename: 'contact.html',
      template: 'src/contact.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      title: 'Development',
      filename: 'about.html',
      template: 'src/about.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      title: 'Development',
      filename: 'service.html',
      template: 'src/service.html',
      inject: 'head'
    }),
    new HtmlWebpackPlugin({
      title: 'Development',
      filename: 'education.html',
      template: 'src/education.html',
      inject: 'head'
    }),
    // new CopyWebpackPlugin([ { from: "./src/images/*", to: "./dist"} ])
    new CopyWebpackPlugin([ { from: "src/images/", to: "images" } ])
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
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader'
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};