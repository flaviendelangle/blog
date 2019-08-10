import styled from 'styled-components'

import { breakpoints, Text } from '@habx/lib-design-system'

export const ArticleContainer = styled.div`
  &:not(:first-child) {
    margin-top: 48px;

    @media (${breakpoints.below.smallTablet}) {
      margin-top: 24px;
    }
  }
`

export const ArticleDate = styled(Text)`
  margin-bottom: 12px;
`
