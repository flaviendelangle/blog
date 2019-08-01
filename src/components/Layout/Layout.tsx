import * as React from 'react'

import { ThemeProvider, palette } from '@habx/lib-design-system'

import Footer from '@components/Footer'
import Header from '@components/Header'

import { ACEFonts } from '@style/fonts'

import LayoutProps from './Layout.interface'
import { LayoutContainer, LayoutContent, GlobalStyle } from './Layout.style'

const THEME_PATCH = {
  colors: {
    primary: {
      base: palette.green[600],
      hover: palette.green[700],
      focus: palette.green[800],
      contrastText: '#FFFFFF',
    },
  },
}

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  width = 'regular',
  title,
  subtitle,
  homeLinkTitle,
}) => (
  <ThemeProvider isRoot theme={THEME_PATCH}>
    <LayoutContainer>
      <GlobalStyle />
      <ACEFonts />
      <Header title={title} subtitle={subtitle} homeLinkTitle={homeLinkTitle} />
      <LayoutContent data-width={width}>{children}</LayoutContent>
      <Footer />
    </LayoutContainer>
  </ThemeProvider>
)

export default Layout
