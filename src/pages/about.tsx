import { graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'
import styled from 'styled-components'

import { Text, Title, Link } from '@habx/lib-design-system'

import Layout from '@components/Layout'

const Resource = styled.div`
  margin-top: 24px;
`

const About = () => {
  const data = useStaticQuery(graphql`
    query PageAboutQuery {
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
    <Layout title="About me">
      <Resource>
        <Link newTab href={data.site.siteMetadata.coordinates.githubProfile}>
          Github profile
        </Link>
      </Resource>
      <Resource>
        <Link newTab href="https://www.habx.com/en">
          Official website of Habx
        </Link>
      </Resource>
      <Resource>
        <Link newTab href="https://habx.github.io/thunder-ui/">
          Storybook @habx/thunder-ui
        </Link>
      </Resource>
      <Resource>
        <Link newTab href="https://habx.github.io/lib-design-system/">
          Storybook @habx/lib-design-system
        </Link>
      </Resource>
      <Text></Text>
    </Layout>
  )
}

export default About
