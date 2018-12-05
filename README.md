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
