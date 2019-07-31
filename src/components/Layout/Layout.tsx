import * as React from 'react'

import Footer from '../Footer'
import Header from '../Header'

import { LayoutContainer, LayoutContent, GlobalStyle } from './Layout.style'

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => (
  <LayoutContainer>
    <GlobalStyle />
    <Header />
    <LayoutContent>{children}</LayoutContent>
    <Footer />
  </LayoutContainer>
)

interface LayoutProps {
  children: React.ReactNode
}

export default Layout
