import { Link } from 'gatsby'
import { get } from 'lodash'
import * as React from 'react'

import { Title, Text } from '@habx/lib-design-system'

import Layout from '@components/structure/Layout'

import { useArticleList } from './Home.query'
import { Article, ArticleDate } from './Home.style'

const Home: React.FunctionComponent<{}> = () => {
  const articles = useArticleList()

  return (
    <Layout
      title="A React Journey"
      width="small"
      homeLinkTitle="Yet another tech blog"
    >
      {articles.map(({ node }) => (
        <Link to={get(node, 'frontmatter.path')}>
          <Article>
            <Title type="section" primary>
              {get(node, 'frontmatter.title')}
            </Title>
            <ArticleDate type="caption">
              {get(node, 'frontmatter.date')} - {get(node, 'timeToRead')}min
              read
            </ArticleDate>
            <Text>{node.excerpt}</Text>
          </Article>
        </Link>
      ))}
    </Layout>
  )
}

export default Home
