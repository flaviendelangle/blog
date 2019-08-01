import { graphql, Link, useStaticQuery } from 'gatsby'
import * as React from 'react'

import { Title, Text, palette } from '@habx/lib-design-system'

import Seo from '@components/Seo'

import { HeaderContainer, HeaderContent, HeaderLine } from './Header.style'

const Header: React.FunctionComponent<HeaderProps> = ({ title }) => {
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
            <Title type="section">{data.site.siteMetadata.title}</Title>
          </Link>
          <Link to="/about">
            <Text opacity={1}>Created by Flavien DELANGLE</Text>
          </Link>
        </HeaderLine>
        <Title type="header">{title}</Title>
      </HeaderContent>
    </HeaderContainer>
  )
}

interface HeaderProps {
  title?: string
}

export default Header
