import * as React from 'react'

import { Title } from '@habx/lib-design-system'

import Layout from '../components/Layout'
import SEO from '../components/seo'

const Article = () => (
  <Layout>
    <SEO title="Page two" />
    <Title type="article">Article example</Title>
  </Layout>
)

export default Article
