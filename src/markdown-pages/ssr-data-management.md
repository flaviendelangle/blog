---
path: "/article/ssr/data-management"
date: "2019-08-12"
title: "Data management"
category: "ssr"
---

At [Habx](https://www.habx.com/en), we launched our first product using [NextJS](https://nextjs.org/) in June 2018. 
The goal was to generate pages built on our custom CMS with a strong focus on SEO and performance.
It was a perfect occasion to try *Server Side Rendering* and we chose NextJS for it's simplicity and flexibility.

In this series of articles, I'll try to tackle some of the most frequent issues faced using *Server Side Rendering* and how we tried to solve them. 

A lot of the problems we had were linked to a bad management of our data, especially for content used on both the server and the client.
These issues taught me the importance of single sources of truth. Indeed, in an application built with NextJS, all of our React code is executed twice. Therefore, we must structure all of our data to avoid inconsistencies between both worlds.

---
### Use NextJS runtime config whenever possible

If the data you want to use can be determined ahead of runtime, the best solution is to use [publicRuntimeConfig](https://github.com/zeit/next.js/#runtime-configuration). This object is part of the NextJS config and will be accessible on both the server and the client.

We used this approach for things like api credentials.
First you need to defined a *publicRuntimeConfig* key into your Next config. This will be the object you will be asking for inside your application.
Make sure you only put things that you are willing to make public inside your bundle. For secret content, NextJS gives you another key names *serverRuntimeConfig* which wont be passed to the client.

```js
// next.config.js
const env = require('./config')

module.exports = {
  publicRuntimeConfig: {
    googleMapApiKey: env.get('googleMapApiKey'),
    /* ... */
  },
  /* ... */
}
```

Then you just have to call *getConfig()* to retrieve what you need.

```jsx
// components/Map.js
import * as React from 'react'
import getConfig from 'next/config'
import GoogleMap from 'google-map-react'

const API_KEYS = {
  key: getConfig().publicRuntimeConfig.googleMapApiKey,
}

const Map = props => <GoogleMap bootstrapURLKeys={API_KEYS} {...props} />

export default Map
```

---
### For static data, use the React context

The more complex our application became, the more we needed small static data like the current language of the user, the query arguments, the device family, ...
At first we tried to put a lot of logic in the components themselves. However we quickly realised that it could hardly scale. 
We then decided to compute all these information in *_app.js* and *_document.js* and to use React context to dispatch it to the rest of the application.

#### Page related data (ex: query)

Most of the data handled by these contexts is relative to the page the user is currently visiting.
If he uses an internal link, these data must be updated accordingly.

That's why we decided to use *_app.js* to compute them.
It's important to remember that *_app.js* is executed both on the server and on the client. 
Therefore your functions must be able to create the same data with the server variables (often **req**) and the client variables (often **window**).

```jsx
// pages/_app.tsx
import App, { Container } from 'next/app'
import * as React from 'react'
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
For this kind of data, it's impossible to use *_app.js* because any page accessed with an internal link would not be able to have them.

The solution we came with is to compute the data in an Express Middleware and to store it on **req**.
Then we just have to write it on **window** in *_document.js* to be able to access it both on server and client side in *_app.js*.

```jsx
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

run()
```

```jsx
// pages/_document.tsx
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

```jsx
// pages/_app.tsx
import App, { Container } from 'next/app'
import * as React from 'react'
import { FlagContext } from '@hooks/contexts'

class ACE extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    const reactContext = ctx.req 
      ? ctx.req.aceContext 
      : window.aceContext

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

On a regular React application, you may be tempted to use the local state to store data used only on specific parts of your application.

```jsx
// components/CountryList.tsx
import * as React from 'react'
import { fetchCountries } from '@lib/countries'
import { Country } from '@components/molecules'

const CountryList = () => {
  const [countries, setCountries] = React.useState([])

  React.useEffect(() => {
    const fetch = async () => {
      const response = await fetchCountries()
      setCountries(response)
    }

    fetch()
  })

  return countries.map(country => <Country key={country.id} data={country} />)
}
```

However in an SSR application, your component would be fetching all the data twice with a nice flickering after the hydration.
This issue can be solved by using a global state and by passing it from the server to the client.

The solution we decided to use last summer when we began to do API calls on our project was Redux because at the time it was our main store on most of our codebase.
We used [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper) which make the usage of Redux with NextJS super easy.

If you want your data to be loaded into your store and your components before sending the HTML to the client, make sure to fetch it in *Page.getInitialProps*.

```jsx
// pages/content.tsx
import * as React from 'react'
import { useSelector } from 'react-redux'

import { fetchContent } from '@actions/content'

const ContentPage = () => {
  const content = useSelector(state => state.content)

  return (
    <React.Fragment>
      <h2>{ content.title }</h2>
      <span>{ content.message }</span>
    </React.Fragment>  
  )
}

ContentPage.getInitialProps = async ({ store, query }) => {
  await store.dispatch(fetchContent({ id: query.id }))
}
```

---
### Recap

Managing your data in a server side rendered application can be quite hard, especially if your global structure is not adapted. In the last year, we came to the following conclusions :

1) If your data can be determined at build time, use **publicRuntimeConfig**
2) For static data, use **React.createContext** and generate data in *_document.js* or *_app.js* to avoid inconsistencies
3) For API data, use a global store like **Redux** or **Apollo Client** and fetch everything in **Page.getInitialProps**

