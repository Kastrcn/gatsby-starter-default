---
title: "CSS使用"
date: "2019-01-02"
---

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

安装依赖

`npm install --save gatsby-plugin-typography react-typography typography`

gatsby-config.js  启用插件

```javascript
module.exports = {
  plugins: [`gatsby-plugin-typography`],
}
```

创建src/utils/typography.js

```javascript
import Typography from "typography"

const typography = new Typography({ baseFontSize: "18px" })

export default typography
```

添加启动项

```
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

使用第三方

安装依赖

```
npm install --save typography-theme-bootstrap typography-theme-lawton
```

引用依赖

```javascript
import Typography from "typography"
import bootstrapTheme from "typography-theme-bootstrap"

const typography = new Typography(bootstrapTheme)

export default typography
```

第三方依赖列表

https://github.com/KyleAMathews/typography.js



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



CSS in JAVASCRIPT

First, create the file for the CSS at `src/pages/about-css-modules.module.css`. You’ll notice that the file name ends with `.module.css`instead of `.css` like normal. This is how you tell Gatsby that this CSS file should be processed as CSS modules.

