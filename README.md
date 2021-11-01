# w5v3
## \# 本demo webpack5+vue3 搭建一个项目，供身边不熟练的朋友学习参考使用

## 一 初始化项目
1. 新建一个工程目录，然后在打开供新建的工程目录，输入 npm init -y 初始化项目
2. 安装webpack 所需的依赖, 这些插件只用于开发环境，后面加--save -dev 或者 -D
	- npm  i webpack 
	- npm  i webpack-cli
	- npm  I webpack-merge
	- npm  i webpack-dev-server
	- npm  i clean-webpack-plugin
	- npm i  html-webpack-plugin
  - 这边安装依赖后，新建一个 .gitignore的文件 屏蔽下node_modules文件夹
3. 在工程文件夹里新建 webpack-config目录 ，并在该文件目录里新建3个配置文件,和一路径变量的js文件
	```
    ├── config 
    │   ├── webpack.common.js  // dev和prod 环境共用的配置                
    │   ├── webpack.dev.js                
    │   └── webpack.prod.js
    |   └── paths.js
  ```
  webpack.common.js
```
  module.exports = {
    entry: path.join(srcPath, 'index'),
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html'
        })
    ],
  }
```
4.  在scr文件里新建index.html 和index.js文件 
    ```
    ├── src                  
    │   ├── index.html             
    │   └── index.js
    ```
  这时在 2个文件写个初始调试的代码
  再在package.json的 script里写下dev 和 build 对应的指令
  "dev" :"webpack-dev-server --config webpack-config/webpack.dev.js",
  "bulid":"webpack-dev-server --config webpack-config/webpack.prod.js"
  这时试跑下 npm run dev 应该已经可以跑起来了 
5. 安装vue3 需要的模块
  - npm i vue@next
  因为接下来 要新建 .vue的文件 
  - 所以要先安装下 vue-loader 和 vue-template-compiler 
    npm install -D vue-loader vue-template-compiler
  - 实践操作下来发现上述vue-loader是对应vue2版本的，试打包时报错 vue-loder 版本也偏低
  - 重新安装下vue-loader对应的2个插件
    - npm update vue-loader 
    - npm i template-compiler -D
  
  - 上面因为用到了vue 使到了es6的语法，所以需要在配置下babel-loader 
    在webpack.common.js 配置下 vue-loader 官方文档 https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE

  - npm i --save-dev @babel/core babel-loader @babel/preset-env
    babel-loader的配置链接 https://www.kancloud.cn/i281151/note/2321691
    babel 7.4之后弃用了 babel-polyfill现在直接使用 core-js 和 regenerator
    简单点理解就是 es6以上的一些api 对应api按需引入来解析
  - 根目录里 新建 .babelrc 文件
    babel-polyfill以及在新版本中不用安装了 直接使用
  - 修改下 新建一个 App.vue 将它和 index.js 关联起来,试运行 此时应该可以成功编译展示vue3写的代码了
 
5. 安装css模块
  - npm i css-loader -D //大致理解为 webpack通过这个来区分css 文件和js文件
  - npm i style-loader -D // 再通过style-loader 插入到文件样式上
  - npm i postcss-loader -D // 处理浏览器兼容
  - npm i less -D
  - npm i less-loader  //我这边使用less
  安装好后在webpack.common.js文件里配置下。其中使用postcss-loader需要在根目录里 新建一个 postcss.config.js的配置文件, 配置下使用autoprefixer插件
  - npm i autoprefixer -D 
  然后引入第三方组件库 naive-ui 
  - npm i -D naive-ui
  然后代码层面 劈里啪啦的写一堆代码，没问题 就表示项目以及初始化好了。
  
6.常规优化配置
  - npm i file-loader -D
  -图片配置的配置，本地的静态图片直接，在开发过程中直接使用file-loader去引入图片的url,但是线上环境肯定要对图片进行处理，小图片转义成base64格式。所以分别在webpack.dev.js和webpack.prod.js进行配置
 - webpack.prod.js的 output 配置加上hash 这样打包出来的文件上自带hash戳,如果js没变 ，线上代码如果用户的浏览器如果说没变的js代码，就会命中缓存，请求更快。 这个点也是属于性能优化里的知识点

  - css抽离压缩
    前面我们将css这块的代码都放在了webpack.common.js这个文件里，属于公共的。实际上dev 和prod环境还是要区分开优化下的，webpack.common.js 这里的css配置 直接剪切到 webpack.dev.js里，prod里再重新配置。
    - npm i mini-css-extract-plugin -D
    再prod里引入插件，css的配置代码基本和dev里的css配置一样 主要是用MiniCssExtractPlugin.loader替换dev里的style-loader。
    再在prod的plugins调用下 MiniCssExtractPlugin 具体见代码。
    抽离完了再配置下css的压缩
    - npm i -D terser-webpack-plugin
    - npm i -D optimize-css-assets-webpack-plugin //这TM又是个坑 webpcak5 不支持该用下面的
    - npm i css-minimizer-webpack-plugin -D 
    安装2个插件，再在prod文件里添加  optimization:{} 这个配置 
  - 抽离公共代码配置
     在prod的 optimization:{}的 splitChunks 里进行cacheGroups缓存分组配置，大致意思就是:把第三方的模块区分出来 另起个名字，然后配置它的权限 大小限制 最少复用过几次这些 。 
     再回到 webpack.common.js的plugins里 生成index.html里new HtmlWebpackPlugin()里 添加chunks:[],设置上一步在splitchunks里设定的chunks
     
  - IgnorePlugin 避免引入无用模块 
    官方教程上使用的就是 moment.js 的例子，文件体积太大，打包时优化下 只取项目中用到的，压缩打包代码体积。
    moment 在项目中引用时 不要直接默认引用全部，自己手动引用对应的模块。
    在webpack.prod.js里plugins里进行配置 => new webpack.IgnorePlugin(/\.\/locale/,/moment/)
    这个自行试验，官方有详细教程。
  - noParse 避免重复打包
   这个就是我们项目中引入进来的第三方库,是已经打包好的文件（比如lodash,vue,echart
   这种），在webpack.common.js的 module里 添加一个 noParse属性
  - happyPack 多进程打包 提高打包速度 （鸡肋功能 可能面试会被问） 还有 ParalleIUglifyPlugin 多进程压缩js
    我个人觉得比较鸡肋 不知道为什么要用，不找教程详细写了。反正也不难。
  
  目前常规项目的优化这个操作教程应该够用了
  还有其它 优化的配置 
    DllPlugin 动态链接库
    cdn加速 
    等等 详细可以参考  https://webpack.wuhaolin.cn 电子书


x. 多页配置 
  entry和output 2点出发,先在入口webpack.common.js里配置一个other的入口webpack.prod.js里配置output里的 filename，具体见代码注释。另外在 webpack.common.js的plugins里也需对应的多页配置new HtmlWebpackPlugin()


webpack检测和分析
webpack-bundle-analyzer 体积分析 
source-map-explorer
Stats 分析可是化图
speed-measure-webpack-plugin速度分析