import { graphql, Link, useStaticQuery } from 'gatsby'
import * as React from 'react'

import { Title, Text, palette } from '@habx/lib-design-system'

import { HeaderContainer, HeaderContent } from './Header.style'

const Header: React.FunctionComponent<{}> = () => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          coordinates {
            githubProfile
          }
        }
      }
    }
  `)

  return (
    <HeaderContainer backgroundColor={palette.blue[400]}>
      <HeaderContent>
        <Link to="/">
          <Title type="header">{data.site.siteMetadata.title}</Title>
        </Link>
        <Text markdown inline>
          {`Created by [Flavien DELANGLE](${data.site.siteMetadata.coordinates.githubProfile})`}
        </Text>
      </HeaderContent>
    </HeaderContainer>
  )
}

export default Header
