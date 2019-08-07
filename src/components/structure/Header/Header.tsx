import { Link } from 'gatsby'
import * as React from 'react'

import { Title, palette } from '@habx/lib-design-system'

import Seo from '@components/structure/Seo'

import HeaderProps from './Header.interface'
import { useSiteMetadata } from './Header.query'
import {
  HeaderContainer,
  HeaderContent,
  HeaderLine,
  AboutLink,
} from './Header.style'

const Header: React.FunctionComponent<HeaderProps> = ({
  title,
  subtitle,
  homeLinkTitle,
}) => {
  const siteMetadata = useSiteMetadata()

  return (
    <HeaderContainer backgroundColor={palette.green[400]}>
      <Seo title={title || ''} />
      <HeaderContent>
        <HeaderLine>
          <Link to="/">
            <Title type="section">{homeLinkTitle || siteMetadata.title}</Title>
          </Link>
          <Link to="/about">
            <AboutLink opacity={1} markdown inline>
              Created by Flavien DELANGLE
            </AboutLink>
          </Link>
        </HeaderLine>
        <Title type="headerSmall">{title}</Title>
        {subtitle && <Title type="section">{subtitle}</Title>}
      </HeaderContent>
    </HeaderContainer>
  )
}

export default Header
