import styled from 'styled-components'

import { palette } from '@habx/lib-design-system'

import { markdownContainer } from '@style/mixins'

export const ArticleMarkdown = styled.div`
  ${markdownContainer};

  & .gatsby-highlight {
    background-color: ${palette.yellow[200]};
    border-radius: 2px;
    overflow: hidden;
    margin-top: 24px;

    & pre[class*='language-'] {
      background-color: transparent;
    }
  }
`
