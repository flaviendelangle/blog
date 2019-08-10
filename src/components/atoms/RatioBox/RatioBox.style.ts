import styled from 'styled-components'

export const RatioContainer = styled.div<{ ratio: number }>`
  width: 100%;
  height: 0;
  padding-top: calc(100% / ${({ ratio }) => ratio});
  position: relative;
`

export const RatioContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`
