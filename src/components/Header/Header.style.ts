import styled from 'styled-components'

import { Background, breakpoints } from '@habx/lib-design-system'

import { regularContentWidth } from '@style/mixins'

export const HeaderContainer = styled(Background)``

export const HeaderContent = styled.header`
  ${regularContentWidth};

  padding: 48px 0;

  @media (${breakpoints.below.phone}) {
    padding: 24px 0;
  }
`

export const HeaderLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: 24px;
`
