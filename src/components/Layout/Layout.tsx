import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'

import Footer from '../Footer'
import Header from '../Header'

import { LayoutContainer, LayoutContent, GlobalStyle } from './Layout.style'

const Layout: React.FunctionComponent<LayoutProps> = ({ children, title }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const realTitle = title || data.site.siteMetadata.title

  return (
    <LayoutContainer>
      <GlobalStyle />
      <Header title={realTitle} />
      <LayoutContent>{children}</LayoutContent>
      <Footer />
    </LayoutContainer>
  )
}

interface LayoutProps {
  children: React.ReactNode
  title?: string
}

export default Layout
