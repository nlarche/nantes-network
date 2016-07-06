var webpack = require("webpack")

var ENV = process.env.NODE_ENV

module.exports = {
  entry: ["./src/main"],
  output: {
    filename: "./dist/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ["babel"],
        include: __dirname,
        exclude: /node_modules/
      }
    ]
  },
  plugins: (ENV === "production" ?
    [
      new webpack.optimize.UglifyJsPlugin({minimize: true}),
    ] :
    [new webpack.HotModuleReplacementPlugin()]
  ),
  devServer: {
    contentBase: "./",
    hot: true,
  }
};
