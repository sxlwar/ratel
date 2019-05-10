# Ratel

这个项目是[Angular完全开发手册](http://www.hijavascript.com) 的官网代码

This project includes the code of official site of [Angular完全开发手册](http://www.hijavascript.com)
## Development server

运行 `ng serve` 启动开发服务器，然后在浏览器中输入 `http://localhost:4200`。

run `ng serve` to start the server, then type `http://localhost:4200` in your browser.
## Build

运行 `npm run build:ssr` 会启动项目的构建过程，运行完成将会在 dist 目录下生成以下结构：

run `npm run build:ssr` to start the building process of the project. After that, the following structure will be generated in the `dist` folder.

> 注意： 由于 ng-zorro-antd 目前不支持ssr，在打包生产环境代码时需要将 src/formly-zorro/formly-zorro-routing.module.ts 中的子路由注释掉

> Note: Currently ng-zorro-antd does not support ssr, you need to comment the sub routing config in src/formly-zorro/formly-zorro-routing.module.ts before production build.

```js
----|
    ----browser|
    ----server|
```

browser文件夹下为打包后的源代码。server文件夹下为服务端渲染所需要的代码。

The packed source code will be in the `browser` folder, and the code for server side rendering will be in the `server` folder.

----

## NGX_FORMLY_ZORRO

### 产生原因
### Cause

Ngx Formly 是一个可以使用动态JSON驱动的表单库，如果你需要更加详细的学习它的使用方法，请访问[官方仓库](https://github.com/ngx-formly/ngx-formly)。

Ngx Formly is a dynamic JSON powered form library, if you want to learn more details about how to use it, please visit [ngx-formly](https://github.com/ngx-formly/ngx-formly)

Ng Zorro Antd 是 Ant Design 的 Angular 版本，如果你需要更加详细的学习它的使用方法，请访问[官方仓库](https://github.com/NG-ZORRO/ng-zorro-antd)。

Ng Zorro Antd is the Angular version of Ant Design, if you want to learn more details about it, please visit [NG-ZORRO](https://github.com/NG-ZORRO/ng-zorro-antd)

目前 Ngx Formly 官方尚未提供对 Ng Zorro Antd 的支持，尽管已经有开发者向官方仓库提交了相关的 pr，但目前为止都没有合入，可能管理人员的工作太忙吧。

Ngx Formly offcially does not provide support for Ng Zorro Antd till now. Even some developers have submitted relative pull requests, but are still not merged, maybe the admins are far too busy due to the 996 :)

> 源码位置：src/app/ngx-formly-zorro 完全按照 [Ngx Formly](https://github.com/ngx-formly/ngx-formly) 的方式开发

> Source code position：src/app/ngx-formly-zorro, totally followed the way of [Ngx Formly](https://github.com/ngx-formly/ngx-formly) to develop

### 安装方法

### Installation

按照[Ngx Formly](https://github.com/ngx-formly/ngx-formly)官方提供的方式进行即可，只不过Ng Zorro Antd 的包尚未在 **@ngx-formly/** 路径下，目前你可以使用 ngx-formly-zorro 这个包来替代，例如：

Just follow the method provided by [Ngx Formly](https://github.com/ngx-formly/ngx-formly), but the package of Ng Zorro Antd is still not under the path **@ngx-formly/**, you can use package ngx-formly-zorro to substitute, for instance:

```bash
npm install --save @angular/forms @ngx-formly/core ngx-formly-zorro
```

### DEMO

DEMO的方式也是安全按照 [Ngx Formly](https://github.com/ngx-formly/ngx-formly)的方式进行，由于没来得及申请域名，暂时将它放在这个博客网站下。

Demo also totally follows the [Ngx Formly](https://github.com/ngx-formly/ngx-formly), because we still have not applied for domain name, we put it in the blog site.

你可以跳转到 [这里](http://www.hijavascript.com) 查看相关示例及代码，并且你也可以通过每个demo右上方的按钮进行调试或者查看示例代码。

You can click [here](http://www.hijavascript.com) to check the examples and codes, besides you can also click the buttons above every demo to debug or check the code.

### CONTRIBUTING

目前只是封装了 Ng Zorro Antd 中常用的几个基础表单控件，你可以使用 Ng Formly 提供的自定义控件方式继续添加其它表单控件。在提交代码前强烈建议您阅读 [Ngx Formly](https://github.com/ngx-formly/ngx-formly) 封装UI的方式，并按照其扩展UI组件的方式继续实现其它表单控件。

Currently only a few basic form controls commonly used in Ng Zorro Antd are packaged, you can continue to add other form controls using the custom controls provided by Ng Formly. Before you submit your code, we strongly recommend you to read the method to encapsulate the UI from [Ngx Formly](https://github.com/ngx-formly/ngx-formly), and continue to implement other form controls in the same way that they extend UI components.

### CONTRIBUTORS

[<img src="https://avatars2.githubusercontent.com/u/20088392?s=60&v=4" width="100">](https://github.com/sxlwar)[<img src="https://avatars1.githubusercontent.com/u/26297704?s=60&v=4" width="100">](https://github.com/ZQ-jhon)[<img src="https://avatars3.githubusercontent.com/u/30424884?s=60&v=4" width="100">](https://github.com/Lei-Wei)
