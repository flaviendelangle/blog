import styled from 'styled-components'

import { Card } from '@habx/lib-design-system'

export const ProjectCardContainer = styled.div`
  flex: 0 1 350px;
  margin: 12px 18px;

  & .gatsby-image-wrapper {
    height: 100%;
  }
`

export const ProjectCardContent = styled(Card)`
  height: 100%;
`

export const ProjectCardInformation = styled.div`
  margin: 24px 24px;

  & h4 {
    margin-bottom: 12px;
  }
`
