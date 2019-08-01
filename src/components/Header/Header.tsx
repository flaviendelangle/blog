import { graphql, Link, useStaticQuery } from 'gatsby'
import * as React from 'react'

import { Title, palette } from '@habx/lib-design-system'

import Seo from '@components/Seo'

import HeaderProps from './Header.interface'
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
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <HeaderContainer backgroundColor={palette.orange[400]}>
      <Seo title={title || ''} />
      <HeaderContent>
        <HeaderLine>
          <Link to="/">
            <Title type="section">
              {homeLinkTitle || data.site.siteMetadata.title}
            </Title>
          </Link>
          <Link to="/about">
            <AboutLink opacity={1} markdown inline>
              Created by Flavien DELANGLE
            </AboutLink>
          </Link>
        </HeaderLine>
        <Title type="header">{title}</Title>
        {subtitle && <Title type="section">{subtitle}</Title>}
      </HeaderContent>
    </HeaderContainer>
  )
}

export default Header
