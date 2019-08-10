import styled from 'styled-components'

import { Title } from '@habx/lib-design-system'

export const ContactLinks = styled.div`
  margin: 0 0 48px 0;
`

export const AboutTitle = styled(Title).attrs(() => ({ type: 'article' }))`
  margin-bottom: 24px;
`

export const ProjectCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  margin: -12px -18px;
`
