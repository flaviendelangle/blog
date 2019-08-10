import styled from 'styled-components'

export const ProjectCardContainer = styled.div`
  max-width: 400px;

  &:not(:last-child) {
    margin-bottom: 24px;
  }
`

export const ProjectCardContent = styled.div`
  margin: 12px 24px;

  & h4 {
    margin-bottom: 12px;
  }
`
