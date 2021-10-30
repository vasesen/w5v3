const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const  VueLoaderPlugin = require('vue-loader')
const { VueLoaderPlugin } = require('vue-loader')
const { srcPath, distPath } = require('./paths')

module.exports = {
    entry: path.join(srcPath, 'index.js'), 
    //如果是多页配置 换成下面的代码
    // entry: {
    //   index: path.join(srcPath, 'index.js'),
    //   other: path.join(srcPath, 'other.js')
    // },
    module:{
      rules:[
        {
          test: /\.vue$/,
          use: ['vue-loader']
        },
        {
          test: /\.js$/,
          use:['babel-loader?cacheDirectory'], 
          include: srcPath,
          exclude: /node_modules/
        },
        // {
        //    test:/\.css$/,
        //    use:['style-loader', 'css-loader', 'postcss-loader']  // loader 的执行顺序是：从后往前
        // },
        // {
        //   test: /\.less$/,
        //   use: ['style-loader', 'css-loader', 'less-loader']
        // }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(srcPath, 'index.html'),
        filename: 'index.html',
        // minify: {
        //   collapseWhitespace: true, // 去掉空格
        //   removeComments: true // 去掉注释
        // },
        // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
        chunks: ['index', 'vendor', 'common']  // 只引用 index.js
      }),
      // new HtmlWebpackPlugin({
      //   template: path.join(srcPath, 'other.html'),
      //   filename: 'other.html',
      //   chunks: ['other']  // 只引用 other.js
      // }),
      new VueLoaderPlugin()
    ],
}