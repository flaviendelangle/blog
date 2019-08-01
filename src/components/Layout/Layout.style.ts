import styled, { createGlobalStyle } from 'styled-components'
import styledNormalize from 'styled-normalize'

import { titleStyles, linkStyle } from '@habx/lib-design-system'

import { regularContentWidth } from '@style/mixins'

export const GlobalStyle = createGlobalStyle`
  ${styledNormalize};
  
  html, body, #___gatsby {
    width: 100vw;
  }
  
  *, *:before, *:after {
    box-sizing: border-box;
  }
  
  *[data-markdown="true"] {
    & p {
      margin: 12px 0;
    }
    
    & h2 {
      ${titleStyles.article};
    }
    
    & h3 {
      ${titleStyles.section};
      
      &:not(:first-child) {
        margin-top: 48px;
      }
    }
    
    & h4 {
      ${titleStyles.regular};
      
      &:not(:first-child) {
        margin-top: 24px;
      }      
    }
    
    & strong {
      font-weight: 600;
    }
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
  ${regularContentWidth};

  flex: 1 1 auto;
  padding: 24px 0;
`
