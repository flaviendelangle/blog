import styled from 'styled-components'

import { Background } from '@habx/lib-design-system'

import { regularContentWidth } from '@style/mixins'

export const FooterContainer = styled(Background)``

export const FooterContent = styled.footer`
  ${regularContentWidth};

  padding: 48px;
`
