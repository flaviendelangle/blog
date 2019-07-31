import * as React from 'react'
import styled from 'styled-components'

import { Text, Title, Link } from '@habx/lib-design-system'

import Layout from '@components/Layout'

const Resource = styled.div`
  margin-top: 24px;
`

const Article = () => (
  <Layout title="About me">
    <Title type="section">Resources</Title>
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
      <Link newTab href="https://habx.github.io/thunder-ui/">
        Storybook @habx/lib-design-system
      </Link>
    </Resource>
    <Text></Text>
  </Layout>
)

export default Article
