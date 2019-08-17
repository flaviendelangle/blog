import styled from 'styled-components'

import { Text, palette, breakpoints } from '@habx/lib-design-system'

import { markdownContainer } from '@style/mixins'

export const ArticleMarkdown = styled(Text)`
  ${markdownContainer};

  margin-top: 24px;

  & hr {
    margin: 36px 0 48px 0;
    border: 0.5px solid ${palette.darkBlue[300]};
  }

  & ol,
  & ul {
    padding-inline-start: 0;
  }

  & li {
    margin-bottom: 12px;
  }

  & h2 {
    margin-bottom: 36px;
  }

  & h3 {
    margin-bottom: 24px;
  }

  & .gatsby-highlight {
    border-radius: 2px;
    overflow: hidden;
    margin-top: 24px;

    @media (${breakpoints.below.phone}) {
      margin: 0 -24px;
    }

    & .gatsby-highlight-code-line {
      display: block;
      background-color: rgba(255, 255, 255, 0.156);
      margin: 0 -16px;
      padding: 0 16px;
    }
  }
`
