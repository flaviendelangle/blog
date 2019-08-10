import * as React from 'react'

import Layout from '@components/structure/Layout'

import ArticleCard from './ArticleCard'
import { useArticleList } from './Home.query'

const Home: React.FunctionComponent<{}> = () => {
  const articles = useArticleList()

  return (
    <Layout
      title="A React Journey"
      width="small"
      homeLinkTitle="Yet another tech blog"
    >
      {articles.map(({ node }, index) => (
        <ArticleCard key={index} article={node} />
      ))}
    </Layout>
  )
}

export default Home
