import styled from 'styled-components'

import { Background, breakpoints } from '@habx/lib-design-system'

import { regularContentWidth } from '@style/mixins'

export const FooterContainer = styled(Background)``

export const FooterContent = styled.footer`
  ${regularContentWidth};

  padding: 48px 0;
  display: flex;
  justify-content: space-between;

  @media (${breakpoints.below.phone}) {
    padding: 24px 0;
    flex-direction: column;

    & > *:nth-child(2) {
      margin-top: 24px;
    }
  }
`

export const FooterLinks = styled.div`
  > *:not(:last-child) {
    margin-right: 36px;
  }
`
