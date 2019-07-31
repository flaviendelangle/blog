import { css } from 'styled-components'

import { breakpoints } from '@habx/lib-design-system'

export const regularContentWidth = css`
  width: 1296px;
  max-width: calc(100% - 96px);
  margin: auto;

  @media (${breakpoints.below.phone}) {
    max-width: calc(100% - 48px);
  }
`
