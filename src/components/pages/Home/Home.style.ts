import styled from 'styled-components'

import { Text } from '@habx/lib-design-system'

export const Article = styled.div`
  &:not(:first-child) {
    margin-top: 24px;
  }
`

export const ArticleDate = styled(Text)`
  margin-bottom: 12px;
`
