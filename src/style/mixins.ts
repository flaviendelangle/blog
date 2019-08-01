import { css } from 'styled-components'

import { breakpoints, titleStyles } from '@habx/lib-design-system'

export const regularContentWidth = css`
  width: 1296px;
  max-width: calc(100% - 96px);
  margin: auto;

  @media (${breakpoints.below.phone}) {
    max-width: calc(100% - 48px);
  }
`

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
