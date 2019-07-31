import { graphql, Link, useStaticQuery } from 'gatsby'
import * as React from 'react'

import { Title, Text, palette } from '@habx/lib-design-system'

import Seo from '../Seo'

import { HeaderContainer, HeaderContent, HeaderLine } from './Header.style'

const Header: React.FunctionComponent<HeaderProps> = ({ title }) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          coordinates {
            githubProfile
          }
        }
      }
    }
  `)

  return (
    <HeaderContainer backgroundColor={palette.blue[400]}>
      <Seo title={title} />
      <HeaderContent>
        <HeaderLine>
          <Link to="/">
            <Title type="section">React Blog</Title>
          </Link>
          <Text markdown inline>
            {`Created by [Flavien DELANGLE](${data.site.siteMetadata.coordinates.githubProfile})`}
          </Text>
        </HeaderLine>
        <Title type="header">{title}</Title>
      </HeaderContent>
    </HeaderContainer>
  )
}

interface HeaderProps {
  title: string
}

export default Header
