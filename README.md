# 项目说明
基于webpack+vue打包的前端模版工程

## 相关指令

- 初始化

```bash
npm i

npm i -g commitizen
```

- 开发模式

```bash
npm start
```

- mock数据开发模式

```bash
npm run mock
```

- 编译输出生产资源

```bash
npm run build

npm run build -- --html
```

- 创建一个组件
```bash
npm run comp <component>
```

- commit
```bash
git cz
```
```hash
feat：新功能（feature）
fix：修补bug
docs：文档（documentation）
style： 格式（不影响代码运行的变动）
refactor：重构（即不是新增功能，也不是修改bug的代码变动）
test：增加测试
chore：构建过程或辅助工具的变动
```

## 目录结构

```hash
├── build                           //存放构建脚本
|  └── loaders                      //目录存放webpack的自定义loader
|  └── plugins                      //目录存放webpack的自定义plugin
|  └── script                       //目录存放npm执行的脚本
|     └── add                       //创建页面、组件
|  └── template                     //目录存放html,js静态模版
|  └── conf.js                      //构建脚本读取的常量配置
|  └── webpack.common.js            //webpack构建脚本公共部分
|  └── webpack.config.dev.js        //开发环境下构建配置
|  └── webpack.config.prod.js       //生产环境构建配置
|  └── webpack.dll.js               //vendor文件
├── dist                            //构建打包输出目录
├── src                             //存放代码源文件
|  └── assets                       //资源，图片
|  └── common                       //公共资源
|  └── components                   //存放组件
|  └── lib                          //存放三方资源，npm run build:dll 打出的vendor.js
|  └── pages                        //存放页面，这里存放打包入口文件
|  └── router                       //页面路由配置
|  └── util                         //存放工具api
|  └── service                      //api接口
|  └── store                        //数据状态管理
|  └── views                        //路由对应的页面
├── ftp.config.js                   //ftp server配置列表
├── .babelrc.js                     //配置babel转换规则
├── .eslintrc.js                    //eslint规则
```

## 环境准备

### nvm

```
1、cd ～/下执行git clone https://github.com/creationix/nvm.git .nvm将nvm源码下载到.nvm目录中
2、cd ～/.nvm下执行. nvm.sh激活nvm
3、在～/.bashrc、～/.profile、～/.zshrc文件（文件不存在就手动创建）中添加以下代码确保nvm命令可用
4、export NVM_DIR="$HOME/.nvm"
       [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
      [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
5、 source ～/.bashrc、source ～/.profile、source ～/.zshrc
```

### 通过nvm来安装node版本

```
nvm install 12.18.3
安装node指定版本

nvm use 12.18.3
切换环境node为12.18.3

```
