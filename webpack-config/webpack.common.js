const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const  VueLoaderPlugin = require('vue-loader')
const { VueLoaderPlugin } = require('vue-loader')
const { srcPath, distPath } = require('./paths')

module.exports = {
    entry: path.join(srcPath, 'index'), 
    module:{
      rules:[
        {
          test: /\.vue$/,
          use: ['vue-loader']
        },
        {
          test: /\.js$/,
          use:['babel-loader'],
          include: srcPath,
          exclude: /node_modules/
        },
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
      }),
      new VueLoaderPlugin()
    ],
}