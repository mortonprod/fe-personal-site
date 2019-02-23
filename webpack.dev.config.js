const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
    }),
    // new CopyWebpackPlugin([ { from: path.join(__dirname, "src" ,"images", 'demon.png'), to: path.join(__dirname, ".." ,'dist')} ])
    // new CopyWebpackPlugin([ { from: "src/images/", to: "images" } ])

  ],
  output: {
    filename: '[name].bundle.js',
    // path: path.resolve(__dirname)
    path: path.resolve(__dirname, 'dist')
    // publicPath: "src/images" // The location this dist folder can appear for web dev server.
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
      test: /\.(png|jpg|gif|jpeg)$/,
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