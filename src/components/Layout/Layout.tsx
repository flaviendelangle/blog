import * as React from 'react'

import Footer from '@components/Footer'
import Header from '@components/Header'

import { ACEFonts } from '@style/fonts'

import LayoutProps from './Layout.interface'
import { LayoutContainer, LayoutContent, GlobalStyle } from './Layout.style'

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  width = 'regular',
  title,
  subtitle,
  homeLinkTitle,
}) => (
  <LayoutContainer>
    <GlobalStyle />
    <ACEFonts />
    <Header title={title} subtitle={subtitle} homeLinkTitle={homeLinkTitle} />
    <LayoutContent data-width={width}>{children}</LayoutContent>
    <Footer />
  </LayoutContainer>
)

export default Layout
