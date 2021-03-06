import styled, { createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'

import { linkStyle, breakpoints } from '@habx/lib-design-system'

import {
  markdownContainer,
  smallContentWidth,
  regularContentWidth,
} from '@style/mixins'

export const GlobalStyle = createGlobalStyle`
  ${styledNormalize};

  html {
    font-family: EuclidCircularB;
  }  
  
  *, *:before, *:after {
    box-sizing: border-box;
  }
  
  *[data-markdown="true"] {
    ${markdownContainer};
  }  
  
  & a {
    ${linkStyle};
  }  
`

export const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export const LayoutContent = styled.main`
  flex: 1 1 auto;
  padding: 48px 0;

  @media (${breakpoints.below.phone}) {
    padding: 24px 0;
  }

  &[data-width='small'] {
    ${smallContentWidth};
  }

  &[data-width='regular'] {
    ${regularContentWidth};
  }
`
