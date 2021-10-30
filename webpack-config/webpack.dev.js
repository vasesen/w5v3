const path = require("path");
const webpack = require("webpack");
const webpackCommonConf = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const { srcPath, distPath } = require("./paths");
module.exports = merge(webpackCommonConf, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: "file-loader",
      },
      {
        test:/\.css$/,
        use:['style-loader', 'css-loader', 'postcss-loader']  // loader 的执行顺序是：从后往前
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ],
  },
  devServer: {
    historyApiFallback: true,
    static: distPath, //文档上写的是 contentBase, 但是实际会报错。
    hot: true,
    compress: true,
    hot: true,
    port: 8080,
    proxy: {
      // 将本地 /api/xxx 代理到 localhost:3000/api/xxx
      "/api": "http://localhost:3000",
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      // window.ENV = 'development'
      ENV: JSON.stringify("development"),
    }),
  ],
});
