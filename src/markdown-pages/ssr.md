---
path: "/article/ssr/data-management"
date: "2019-08-01"
title: "Part 1: Data management"
category: "ssr"
---

At [Habx](https://www.habx.com/en), we launched our first product using [NextJS](https://nextjs.org/) in June 2018. 
The goal was to generate pages built with our custom CMS with a strong focus on SEO and performances.
It was a perfect occasion to try *Server Side Rendering* and chose NextJS for it's simplicity and flexibility.

In this series of articles, I'll try to tackle some of the issues we faced and some of the solutions we found.

---

A lot of the problems we had were linked to a bad management of our data, especially when we had to use it on both the server and the client.

One of the most important lessons I learned building a Server Side Rendered Application is the importance of single sources of truth.
In an application built with NextJS, all of our React code is executed twice. Therefore, we must structure all of our data to avoid inconsistencies between both worlds.

---
### Use NextJS runtime config whenever possible

If the data you want to use can be determined ahead of runtime, the best solution is to use [publicRuntimeConfig](https://github.com/zeit/next.js/#runtime-configuration). This object is part of the NextJS config and will be accessible on both the server and the client.

We used this approach for things like the prefix of the static resources of our project.

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

---
### For static data, use the React context

The more complex our application became, the more we needed small static data like the current language of the user, the query arguments, the device family, ...
At first we tried to put a lot of logic in the components. However we quickly realised that I could hardly scale. 
We then decided to compute all these information in *_app.js* and *_document.js* and to use React context to dispatch it to the rest of the application.

#### Page related data (ex: query)

Most of the data handled by these contexts is relative to the page the user is currently visiting.
If he use an internal link, these data must be updated accordingly.

That's why we decided to use *_app.js* to compute them.
It's important to remember that *_app.js* is executed both on the Server and on the Client. 
Therefore your functions must be able to create the same data with the server variables (often **req**) and the client variables (often **window**).

```js
// _app.tsx
import App, { Container } from 'next/app'
import React from 'react'
import { getLanguageFromUrl, getLanguageRoots } from '@lib/internationalization'
import { InternationalContext, QueryContext } from '@hooks/contexts'


class ACE extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    const international = {
      language: getLanguageFromUrl(ctx.req),
      languageRoots: getLanguageRoots(ctx.req),
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
      international,
      query,
    } = this.props

    return (
      <Container>
          <InternationalContext.Provider value={international}>
            <QueryContext.Provider value={query}>
              <Component {...pageProps} />
            </QueryContext.Provider>
          </InternationalContext.Provider>
      </Container>
    )
  }
}
```

#### Visit related data (ex: feature flags)

Some data can only be gathered on the server, often for security reasons. One of our most recent use case is the list of the feature flags used by our application.
For this kind of data, it's impossible to use *_app.js* because any page accessed with an internal link would not be able to have these data.

The solution we came with is to compute the data in an Express Middleware and to store it on **req**.
Then we just have to write it on **window** in *_document.js* to be able to access it both on server and client side in *_app.js*.

```typescript jsx
// server.ts
import express from 'express'
import next from 'next'
import featureManager from '@lib/features'

const reactContextMiddleware = async (req, res, next) => {
  const flags = await featureManager.get()
  req.reactContext = { flags }
  next()
}

const run = async () => {
  const app = next({ dev: true })
  await app.prepare()
  const server = express()
  server.use(reactContextMiddleware)
}
```

```typescript jsx
// _document.tsx
import Document, { Head, Main, NextScript } from 'next/document'
import * as React from 'react'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      reactContext: ctx.req.reactContext,
    }
  }

  render() {
    const { reactContext } = this.props

    return (
      <html>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.aceContext = ${JSON.stringify(reactContext)}`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
```

```typescript jsx
// _app.tsx
import App, { Container } from 'next/app'
import React from 'react'
import { FlagContext } from '@hooks/contexts'

class ACE extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    const reactContext = ctx.req ? ctx.req.aceContext : window.aceContext

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({
        ...reactContext,
        ...ctx,
      })
    }

    return {
      ...reactContext,
      pageProps,
    }
  }

  render() {
    const {
      Component,
      pageProps,
      flags,
    } = this.props

    return (
      <Container>
          <FlagContext.Provider value={flags}>
              <Component {...pageProps} />
          </FlagContext.Provider>
      </Container>
    )
  }
}
```

---
### For API data, use a global state (ex: Redux, Apollo Client)

On a regular React Application, you may be tempted to use local state to fetch data used only on specific parts of your application.

```typescript jsx
import * as React from 'react'
import { fetchCountries } from '@lib/countries'
import { Country } from '@components/molecules'

const CountryList = () => {
  const [countries, setCountries] = React.useState([])

  React.useEffect(() => {
    const fetch = async () => {
      const response = await fetchCountries()
      setCountries(countries)
    }   
  })

  return countries.map(country => <Country key={country.id} data={country} />)
}
```

However in an SSR application, your component would be fetching all the data twice with a nice flickering after the hydration.
This issue can be solved by using a global store and by passing it from the server to the frontend.

The solution we decided to use last summer when we began to do API calls on our project was Redux because at the time it was used in most of our codebase.
We used [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper) which make the usage of Redux with NextJS super easy.


---
### Recap

Managing your data in a SSR application can be quite hard, especially if your global structure is not adapted. In the last year, we came to the following conclusions :

1) If your data can be determined at build time, use **publicRuntimeConfig**
2) For static data, use **React.createContext** and generate data in *_document.js* or *_app.js* to avoid inconsistencies
3) For API data, use a global store like **Redux** or **Apollo Client**

