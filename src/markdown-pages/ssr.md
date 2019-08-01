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

---
## Use NextJS publicRuntimeConfig whenever possible

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

---
## For static data, use the React context

The more complex our application became, the more we needed small static data like the current language of the user, the query arguments, the device family, ...

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

---
## For API data, use a global state (ex: Redux, Apollo Client)

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

However on an SSR application, your component would be fetching all the data twice with a nice flickering on the hydration.
This issue can be solved by using a global store and by passing it from the server to the frontend.

The solution we decided to use last summer when we began to do API calls on our project was Redux because at the time it was used in most of our codebase.
We used [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper) which make the usage of Redux with NextJS super easy.

---
## Recap

Managing your data in a SSR application can be quite hard, especially if your global structure is not adapted. In the last year, we came to the following conclusions :

1) If your data can be determined at build time, use **publicRuntimeConfig**
2) For static data, use **React.createContext** and generate data in *_document.js* or *_app.js* to avoid inconsistencies
3) For API data, use a global store like **Redux** or **Apollo Client**
4) Only use local state for UI data (is my dropdown opened or not, what is the value of this input ?)

