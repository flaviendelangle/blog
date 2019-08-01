import * as React from 'react'

import Footer from '@components/Footer'
import Header from '@components/Header'

import { LayoutContainer, LayoutContent, GlobalStyle } from './Layout.style'

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  title,
  subtitle,
}) => (
  <LayoutContainer>
    <GlobalStyle />
    <Header title={title} subtitle={subtitle} />
    <LayoutContent>{children}</LayoutContent>
    <Footer />
  </LayoutContainer>
)

interface LayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
}

export default Layout
