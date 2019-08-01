---
path: "/article/ssr"
date: "2019-08-01"
title: "After one year with NextJS"
subtitle: "React hooks and isomorphic code"
---

## A single source of truth

One of the most important lessons I learned using NextJS is the importance of single source of truth in SSR applications.
All of our React code is executed both on the server and on the client. Therefore, we must structure all of our data to avoid inconsistencies between both worlds.

The biggest issue here is to access the variables like **window** and **request** that contains most of the shared data between the server and the client version (routes, queries, device information, ...).
On the client side, **window** is a global variable and can be accessed anywhere. But on the server side, you will have to pass **request** to every place you want to use basic data link the current URL of your application.


### Use NextJS publicRuntimeConfig when possible

If the data you want to use can be determined ahead of runtime, the best solution is to use the [publicRuntimeConfig](https://next-site-hoiiwuqase.zeit.sh/docs#exposing-configuration-to-the-server--client-side) of NextJS.
This data will be accessible from anywhere.

We used this approach for things link the prefix of the static resources of our project.

```typescript jsx
import getConfig from 'next/config'
import { createGlobalStyle } from 'styled-components'

const urlPrefix = getConfig.publicRuntimeConfig.urlPrefix

export default createGlobalStyle`
  @font-face {
    font-family: 'custom-font';
    src: url('${urlPrefix}/static/fonts/custom-font.woff2') format('woff2'),
    font-weight: normal;
    font-style: normal;
    font-display: fallback;
  }
`
```

### For static data, use React.createContext and React.useContext

```js
// _app.js
import App, { Container } from 'next/app'
import React from 'react'
import { getLanguageFromUrl, getLanguageRoots } from '@lib/internationalization'
import { InternationalContext, QueryContext } from '@hooks/contexts'


class ACE extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    const international = {
      language: getLanguageFromUrl(routes.current),
      languageRoots: getLanguageRoots(host),
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({
        international,
        ...ctx,
      })
    }

    return {
      pageProps,
      international,
      query: ctx.query,
    }
  }

  render() {
    const {
      Component,
      pageProps,
      router,
      international,
      query,
    } = this.props

    return (
      <Container>
          <InternationalContext.Provider value={international}>
            <QueryContext.Provider value={query}>
              <Component {...pageProps} router={router} />
            </QueryContext.Provider>
          </InternationalContext.Provider>
      </Container>
    )
  }
}
```
