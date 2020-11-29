# Ratel

This project includes the code of official site of [Angular完全开发手册](https://blog.chtoma.com)

## Development server

run `ng serve` to start the server, then type `http://localhost:4200` in your browser.

## Build

run `npm run build:ssr` to start the building process of the project. After that, the following structure will be generated in the `dist` folder.

> Note: Currently ng-zorro-antd does not support ssr, you need to comment the sub routing config in src/formly-zorro/formly-zorro-routing.module.ts before production build.

```js
----|
    ----browser|
    ----server|
```

The packed source code will be in the `browser` folder, and the code for server side rendering will be in the `server` folder.

----

## NGX_FORMLY_ZORRO

Ngx Formly is a dynamic JSON powered form library, if you want to learn more details about how to use it, please visit [ngx-formly](https://github.com/ngx-formly/ngx-formly)

Ng Zorro Antd is the Angular version of Ant Design, if you want to learn more details about it, please visit [NG-ZORRO](https://github.com/NG-ZORRO/ng-zorro-antd)

Ngx Formly offcially does not provide support for Ng Zorro Antd till now. Even some developers have submitted relative pull requests, but are still not merged, maybe the admins are far too busy due to the 996 :)

> Source code position：src/app/ngx-formly-zorro, totally followed the way of [Ngx Formly](https://github.com/ngx-formly/ngx-formly) to develop

### Installation

```bash
npm install --save @angular/forms @ngx-formly/core ngx-formly-zorro
```

### DEMO

Demo also totally follows the [Ngx Formly](https://github.com/ngx-formly/ngx-formly), because we still have not applied for domain name, we put it in the blog site.

You can click [here](http://blog.chtoma.com) to check the examples and codes, besides you can also click the buttons above every demo to debug or check the code.

### CONTRIBUTING

Currently only a few basic form controls commonly used in Ng Zorro Antd are packaged, you can continue to add other form controls using the custom controls provided by Ng Formly. Before you submit your code, we strongly recommend you to read the method to encapsulate the UI from [Ngx Formly](https://github.com/ngx-formly/ngx-formly), and continue to implement other form controls in the same way that they extend UI components.

### CONTRIBUTORS

[<img src="https://avatars2.githubusercontent.com/u/20088392?s=60&v=4" width="40" style="margin-right: 1em">](https://github.com/sxlwar)[<img src="https://avatars1.githubusercontent.com/u/26297704?s=60&v=4" width="40" style="margin-right: 1em">](https://github.com/ZQ-jhon)[<img src="https://avatars3.githubusercontent.com/u/30424884?s=60&v=4" width="40">](https://github.com/Lei-Wei)
