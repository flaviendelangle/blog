import * as React from 'react'

import { Text, Link, palette } from '@habx/lib-design-system'

import { FooterContainer, FooterContent, FooterLinks } from './Footer.style'

const Footer: React.FunctionComponent<{}> = () => (
  <FooterContainer backgroundColor={palette.darkBlue[900]}>
    <FooterContent>
      <Text>
        © {new Date().getFullYear()}, Built with{' '}
        <Link secondary newTab href="https://www.gatsbyjs.org">
          Gatsby
        </Link>{' '}
        and{' '}
        <Link secondary newTab href="https://habx.github.io/lib-design-system/">
          @habx/lib-design-system
        </Link>
      </Text>
      <FooterLinks>
        <Link secondary newTab href="/rss.xml">
          RSS
        </Link>
        <Link secondary newTab href="https://github.com/flaviendelangle/blog">
          Github
        </Link>
      </FooterLinks>
    </FooterContent>
  </FooterContainer>
)

export default Footer
