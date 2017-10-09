const webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill','./src/banner.js'
  ],
  output: {
    path:__dirname+'/dst',
    filename: 'banner.js'
  },
  module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         },
         {
           test: /\.(jpg|png|ttf|eot|svg|woff)$/,
           exclude: /node_modules/,
           loader: 'base64-image-loader'
          }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
        },
        output: {
            comments: false,
        },
    }),
  ]
};
