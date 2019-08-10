import styled from 'styled-components'

import { Title } from '@habx/lib-design-system'

export const ContactLinks = styled.div`
  margin: 0 0 48px 0;
`

export const AboutTitle = styled(Title).attrs(() => ({ type: 'article' }))`
  margin-bottom: 24px;
`

export const ProjectCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: row;
  row-gap: 8px;
  column-gap: 8px;
`
