---
title: "布局"
date: "2019-01-02"
---

src/components/layout.js

```jsx
import React from "react"

export default ({ children }) => (
  <div style={{ margin: `0 auto`, maxWidth: 650, padding: `0 1rem` }}>
    <h3>MySweetSite</h3> 
    {children}
  </div>
)
```

src/pages/index.js

```jsx
import React from "react"
import Layout from "../components/layout"

export default () => (
  <Layout> 
    <h1>Hi! I'm building a fake Gatsby site as part of a tutorial!</h1>
    <p>
      What do I like to do? Lots of course but definitely enjoy building
      websites.
    </p>
  </Layout>
)
```