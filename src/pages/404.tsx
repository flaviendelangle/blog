import * as React from 'react'

import { Title } from '@habx/lib-design-system'

import Layout from '../components/Layout'
import SEO from '../components/seo'

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Title type="article">Nothing here :(</Title>
  </Layout>
)

export default NotFoundPage
