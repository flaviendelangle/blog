import { Link, graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'
import styled from 'styled-components'

import { Title, Text, Card } from '@habx/lib-design-system'

import Layout from '@components/Layout'

const ArticleCard = styled(Card)`
  margin-top: 24px;

  & > h3 {
    margin-bottom: 12px;
  }
`

const IndexPage = () => {
  const data = useStaticQuery<IndexPageArticleList>(graphql`
    query IndexPageArticleList {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            id
            excerpt(pruneLength: 250)
            frontmatter {
              title
              path
            }
          }
        }
      }
    }
  `)

  return (
    <Layout
      title="A React Journey"
      width="small"
      homeLinkTitle="A personal blog"
    >
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <Link to={node.frontmatter.path}>
          <ArticleCard flat>
            <Title type="section" primary>
              {node.frontmatter.title}
            </Title>
            <Text>{node.excerpt}</Text>
          </ArticleCard>
        </Link>
      ))}
    </Layout>
  )
}

type Article = {
  node: {
    id: number
    excerpt: string
    frontmatter: {
      title: string
      path: string
    }
  }
}

type IndexPageArticleList = {
  allMarkdownRemark: {
    edges: Article[]
  }
}

export default IndexPage
