import styled from 'styled-components'

import { Card } from '@habx/lib-design-system'

export const ProjectCardContainer = styled(Card)`
  max-width: 500px;

  &:not(:last-child) {
    margin-bottom: 24px;
  }

  & > h3 {
    margin: 12px 24px;
  }
`
