const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
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
      title: 'Development',
      template: 'src/index.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Development',
      filename: 'contact.html',
      template: 'src/contact.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Development',
      filename: 'about.html',
      template: 'src/about.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Development',
      filename: 'service.html',
      template: 'src/service.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Development',
      filename: 'education.html',
      template: 'src/education.html'
    })
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
        "style-loader", // creates styl e nodes from JS strings
        "css-loader", // translates CSS into CommonJS
        "sass-loader" // compiles Sass to CSS, using Node Sass by default
      ]
    },
    {
      test: /\.worker\.js$/,
      use: { loader: 'worker-loader' }
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
  }
};