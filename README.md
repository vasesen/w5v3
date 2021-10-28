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
4.  在scr文件里新建index.html 和index.tsx 文件 
    ```
    ├── src                  
    │   ├── index.html             
    │   └── index.js
    ```
    这时在 2个文件写个初始调试的代码
    再在package.json的 script里写下dev 和 build 对应的指令
    "dev" :"webpack-dev-server --config webpack-config/webpack.dev.js",
    "bulid":"webpack-dev-server --config webpack-config/webpack.prod.js"
    这个时候试跑下 npm run dev 应该已经可以跑起来了 
5. 安装Vue3 
  - npm i vue@next
  因为接下来 要新建 .vue的文件 
  - 所以要先安装下 vue-loader 和 vue-template-compiler / npm install -D vue-loader vue-template-compiler
  - 实践操作下来发现上述vue-loader是对应vue2版本的，试打包时报错 vue-loder 版本也偏低
  - 重新安装下vue-loader对应的2个插件
    - npm update vue-loader 
    - npm i template-compiler -D

  再在webpack.common.js 配置下 vue-loader官方文档 https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE
  - npm i --save-dev @babel/core babel-loader @babel/preset-env
  - 根目录里 新建 .babelrc 文件
  - 修改下 新建一个 App.vue 将它和 index.js 关联起来,试运行 此时应该可以成功编译展示vue3 写的代码了
 