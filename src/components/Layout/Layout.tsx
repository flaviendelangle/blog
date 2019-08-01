import * as React from 'react'

import Footer from '@components/Footer'
import Header from '@components/Header'

import { ACEFonts } from '@style/fonts'

import { LayoutContainer, LayoutContent, GlobalStyle } from './Layout.style'

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  title,
  subtitle,
  width = 'regular',
}) => (
  <LayoutContainer>
    <GlobalStyle />
    <ACEFonts />
    <Header title={title} subtitle={subtitle} />
    <LayoutContent data-width={width}>{children}</LayoutContent>
    <Footer />
  </LayoutContainer>
)

interface LayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  width?: 'small' | 'regular'
}

export default Layout
