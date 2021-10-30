const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const webpackCommonConf = require("./webpack.common.js");
//const HappyPack = require('happypack')
const { merge } = require("webpack-merge");
const { srcPath, distPath } = require("./paths");

module.exports = merge(webpackCommonConf, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8 * 1024,  // 小于 8kb 的图片用 base64 格式产出,减少线上的http请求 否则，依然延用 file-loader 的形式，产出 url 格式
            outputPath: "/imgBase/", // 打包到 imgBase 目录下
            // 设置图片的 cdn 地址（也可以统一在外面的 output 中设置，那将作用于所有静态资源）
            // publicPath: 'http://cdn.xxxx.com'
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 这里不再用 style-loader
          "css-loader",
          "postcss-loader",
        ],
      },
      // 抽离 less
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader, // 注意，这里不再用 style-loader
          "css-loader",
          "less-loader",
          "postcss-loader",
        ],
      },
      // {
      //   test:/\.js$/,
      //   //把js文件的处理 id 为babel的HappyPack 实例
      //   use:['happypack/loader?id=babel'],
      //   include:srcPath
      // }
    ],
  },
  output: {
    filename: "[name].[contenthash:8].js", // 打包代码时，加上 hash戳
    //filename: '[name].[contenthash:8].js', // name 即多入口时 entry 的 key
    path: distPath,
    // publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
  },
  plugins: [
    new CleanWebpackPlugin(), // 会默认清空 output.path 文件夹
    new webpack.DefinePlugin({
      // window.ENV = 'production'
      ENV: JSON.stringify("production"),
    }),
     // 抽离 css 文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    }),
    //忽略 moment 下的 /locale 目录
    //new webpack.IgnorePlugin(/\.\/locale/,/moment/)

    // happyPack 多进程打包
    // new HappyPack({
    //   id:'babel',
    //   loaders:['babel-loader?cacheDirectory']
    // })
  ],
  optimization: {
    // 压缩 css
    minimizer: [new TerserJSPlugin({}), new CssMinimizerPlugin()],
    splitChunks: {
      //initial 入口chunk，对于异步导入的文件不处理
      //async 异步chunk，只对异步导入的文件处理
      //all 全部chunk
      chunks: 'all',
      // 缓存分组
      cacheGroups: {
          // 第三方模块
          vendor: {
              name: 'vendor', // chunk 名称
              priority: 1, // 权限更高，优先抽离，重要！！！
              test: /node_modules/,
              minSize: 0,  // 大小限制
              minChunks: 1  // 最少复用过几次
          },
          // 公共的模块
          common: {
              name: 'common', // chunk 名称
              priority: 0, // 优先级
              minSize: 0,  // 公共模块的大小限制
              minChunks: 2  // 公共模块最少复用过几次
          }
      }
  }
  }
});
