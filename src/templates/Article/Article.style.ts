import styled from 'styled-components'

import { Text, palette, breakpoints } from '@habx/lib-design-system'

import { markdownContainer } from '@style/mixins'

export const ArticleMarkdown = styled(Text)`
  ${markdownContainer};

  & .gatsby-highlight {
    background-color: ${palette.yellow[200]};
    border-radius: 2px;
    overflow: hidden;
    margin-top: 24px;

    & pre[class*='language-'] {
      background-color: transparent;
    }

    @media (${breakpoints.below.phone}) {
      margin: 24px -24px 0 -24px;
    }
  }
`
