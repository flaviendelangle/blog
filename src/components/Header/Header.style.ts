import styled from 'styled-components'

import { Background } from '@habx/lib-design-system'

import { regularContentWidth } from '@style/mixins'

export const HeaderContainer = styled(Background)``

export const HeaderContent = styled.header`
  ${regularContentWidth};

  padding: 48px;
`

export const HeaderLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: 24px;
`
