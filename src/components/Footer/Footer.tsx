import * as React from 'react'

import { Text, palette } from '@habx/lib-design-system'

import { FooterContainer, FooterContent } from './Footer.style'

const Footer: React.FunctionComponent<{}> = () => (
  <FooterContainer backgroundColor={palette.darkBlue[900]}>
    <FooterContent>
      <Text
        markdown
        inline
      >{`© ${new Date().getFullYear()}, Built with [Gatsby](https://www.gatsbyjs.org) and [@habx/lib-design-system](https://habx.github.io/lib-design-system/)`}</Text>
    </FooterContent>
  </FooterContainer>
)

export default Footer
