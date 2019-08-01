import { css } from 'styled-components'

import { breakpoints, titleStyles } from '@habx/lib-design-system'

export const contentWidth = (width: number) => css`
  width: ${width}px;
  max-width: calc(100% - 96px);
  margin: auto;

  @media (${breakpoints.below.phone}) {
    max-width: calc(100% - 48px);
  }
`

export const regularContentWidth = contentWidth(1296)

export const smallContentWidth = contentWidth(672)

export const markdownContainer = css`
  & p {
    margin: 12px 0;
  }

  & h1 {
    ${titleStyles.headerSmall};
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
`
