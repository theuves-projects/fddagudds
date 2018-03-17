const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./app/module.js",
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true
              }
            }
          ]
        })
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader"
          // options: {
          //   minimize: true,
          //   removeComments: false,
          //   collapseWhitespace: false
          // }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      exclude: [
        path.resolve(__dirname, "js")
      ]
    }),
    new ExtractTextPlugin("index.css"),
    new CopyWebpackPlugin([
      {from: "./index.html", to: "./"}
    ])
  ]
};