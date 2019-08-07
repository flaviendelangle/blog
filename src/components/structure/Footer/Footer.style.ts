import styled from 'styled-components'

import { Background, breakpoints } from '@habx/lib-design-system'

import { regularContentWidth } from '@style/mixins'

export const FooterContainer = styled(Background)``

export const FooterContent = styled.footer`
  ${regularContentWidth};

  padding: 48px 0;

  @media (${breakpoints.below.phone}) {
    padding: 24px 0;
  }
`
