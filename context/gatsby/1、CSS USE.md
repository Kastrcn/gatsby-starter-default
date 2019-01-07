---
title: "CSS使用"
date: "2019-01-02"
---

## 安装全局css

### 安装依赖 

添加`gatsby-plugin-typography`插件

添加`react-typography`插件

添加`typography`类库

```bash
npm install --save gatsby-plugin-typography react-typography typography
```

###  启用插件

添加配置到gatsby-config.js 

```javascript
plugins: [`gatsby-plugin-typography`]
```

使用配置

添加js配置

src/utils/typography.js

```javascript
import Typography from "typography"

const typography = new Typography({ baseFontSize: "18px" })

export default typography
```

添加自定义js的css配置到gatsby-config.js 

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
  ],
}
```



## 使用第三方

https://github.com/KyleAMathews/typography.js

### 第三方依赖列表

```
typography-theme-alton
typography-theme-bootstrap
typography-theme-de-young
typography-theme-doelger
typography-theme-elk-glen
typography-theme-fairy-gates
typography-theme-funston
typography-theme-github
typography-theme-grand-view
typography-theme-irving
typography-theme-judah
typography-theme-lawton
typography-theme-legible
typography-theme-lincoln
typography-theme-kirkham
typography-theme-moraga
typography-theme-noriega
typography-theme-ocean-beach
typography-theme-parnassus
typography-theme-stardust
typography-theme-st-annes
typography-theme-stern-grove
typography-theme-stow-lake
typography-theme-sutro
typography-theme-twin-peaks
typography-theme-us-web-design-standards
typography-theme-wikipedia
typography-theme-wordpress-kubrick
typography-theme-wordpress-2010
typography-theme-wordpress-2011
typography-theme-wordpress-2012
typography-theme-wordpress-2013
typography-theme-wordpress-2014
typography-theme-wordpress-2015
typography-theme-wordpress-2016
typography-theme-trajan
typography-theme-zacklive
typography-theme-anonymous
```



### 安装依赖

```bash
npm install --save typography-theme-bootstrap typography-theme-lawton
```

### 引用依赖

```javascript
import Typography from "typography"
import bootstrapTheme from "typography-theme-bootstrap"

const typography = new Typography(bootstrapTheme)

export default typography
```





## 添加代码高亮

### 安装依赖

```
npm install --save gatsby-transformer-remark gatsby-remark-prismjs prismjs
```

### 添加配置到gatsby-config.js 

```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        `gatsby-remark-prismjs`,
      ]
    }
  }
]
```

### 使用样式

添加样式到gatsby-browser.js

```js
require("prismjs/themes/prism-okaidia.css")
```

## CSS in JAVASCRIPT

### 创建`.module.css`结尾的css文件

例如`about-css-modules.module.css`



