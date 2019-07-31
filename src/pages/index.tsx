import { Link } from 'gatsby'
import * as React from 'react'

import { Title, Button, Icon } from '@habx/lib-design-system'

import Layout from '@components/Layout'

const IndexPage = () => (
  <Layout title="Home">
    <Title type="article">Home Page example</Title>
    <Link to="/article">
      <Button
        outline
        iconRight={<Icon icon="arrow-east" />}
        style={{ marginTop: 24 }}
      >
        Article example
      </Button>
    </Link>
  </Layout>
)

export default IndexPage
