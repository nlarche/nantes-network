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
      },
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        exclude: /node_modules/,
      },
      { test: /\.svg/, loader: 'svg-url-loader' },
    ]
  },
  plugins: (ENV === "production" ?
    [
      new webpack.optimize.UglifyJsPlugin({ minimize: true }),
      new webpack.DefinePlugin({
        SERVER_URL: JSON.stringify("https://nantes-network-vkphasqxgh.now.sh/"),
      })
    ] :
    [new webpack.DefinePlugin({
      SERVER_URL: JSON.stringify("http://localhost:3030/"),
    })]
  ),
  devServer: {
    contentBase: "./",    
  }
};
