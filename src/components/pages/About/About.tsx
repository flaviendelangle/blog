import { get } from 'lodash'
import * as React from 'react'

import { Link } from '@habx/lib-design-system'

import Layout from '@components/structure/Layout'

import { useSiteMetadata } from './About.query'
import { Resource } from './About.style'

const About: React.FunctionComponent<{}> = () => {
  const metadata = useSiteMetadata()

  return (
    <Layout title="About me">
      <Resource>
        <Link newTab href={get(metadata, 'coordinates.githubProfile')}>
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
    </Layout>
  )
}

export default About
