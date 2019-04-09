# Ratel

这个项目是[Angular完全开发手册](http://www.hijavascript.com) 的官网代码

## Development server

运行 `ng serve` 启动开发服务器，然后在浏览器中输入 `http://localhost:4200`。

## Build

运行 `npm run build:ssr` 会启动项目的构建过程，运行完成将会在 dist 目录下生成以下结构：

```js
----|
    ----browser|
    ----server|
```

browser文件夹下为打包后的源代码。server文件夹下为服务端渲染所需要的代码。

----

## NGX_FORMLY_ZORRO

### 产生原因

Ngx Formly 是一个可以使用动态JSON驱动的表单库，如果你需要更加详细的学习它的使用方法，请访问[官方仓库](https://github.com/ngx-formly/ngx-formly)。

Ng Zorro Antd 是 Antd Design 的 Angular 版本，如果你需要更加详细的学习它的使用方法，请访问[官方仓库](https://github.com/NG-ZORRO/ng-zorro-antd)。

目前 Ngx Formly 官方尚未提供对 Ng Zorro Antd 的支持，尽管已经有开发者向官方仓库提交了相关的 pr，但目前为止都没有合入，可能管理人员的工作太忙吧。

> 源码位置：src/app/ngx-formly-zorro 完全按照 [Ngx Formly](https://github.com/ngx-formly/ngx-formly) 的方式开发

### 安装方法

按照[Ngx Formly](https://github.com/ngx-formly/ngx-formly)官方提供的方式进行即可，只不过Ng Zorro Antd 的包尚未在 **@ngx-formly/** 路径下，目前你可以使用 ngx-formly-zorro 这个包来替代，例如：

```bash
npm install --save @angular/forms @ngx-formly/core ngx-formly-zorro
```

### DEMO

DEMO的方式也是安全按照 [Ngx Formly](https://github.com/ngx-formly/ngx-formly)的方式进行，由于没来得及申请域名，暂时将它放在这个博客网站下。

你可以跳转到 [这里](http://www.hijavascript.com) 查看相关示例及代码，并且你也可以通过每个demo右上方的按钮进行调试或者查看示例代码。

### CONTRIBUTING

目前只是封装了 Ng Zorro Antd 中常用的几个基础表单控件，你可以使用 Ng Formly 提供的自定义控件方式继续添加其它表单控件。在提交代码前强烈建议您阅读 [Ngx Formly](https://github.com/ngx-formly/ngx-formly) 封装UI的方式，并按照其扩展UI组件的方式继续实现其它表单控件。
