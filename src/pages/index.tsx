import { Link, graphql, useStaticQuery } from 'gatsby'
import * as React from 'react'
import styled from 'styled-components'

import { Title, Text } from '@habx/lib-design-system'

import Layout from '@components/Layout'

const Article = styled.div`
  &:not(:first-child) {
    margin-top: 24px;
  }
`

export const ArticleDate = styled(Text)`
  margin-bottom: 12px;
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
            timeToRead
            frontmatter {
              title
              path
              date(formatString: "MMMM DD, YYYY")
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
      homeLinkTitle="Yet another tech blog"
    >
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <Link to={node.frontmatter.path}>
          <Article>
            <Title type="section" primary>
              {node.frontmatter.title}
            </Title>
            <ArticleDate type="caption">
              {node.frontmatter.date} - {node.timeToRead}min read
            </ArticleDate>
            <Text>{node.excerpt}</Text>
          </Article>
        </Link>
      ))}
    </Layout>
  )
}

type Article = {
  node: {
    id: number
    excerpt: string
    timeToRead: number
    frontmatter: {
      title: string
      path: string
      date: string
    }
  }
}

type IndexPageArticleList = {
  allMarkdownRemark: {
    edges: Article[]
  }
}

export default IndexPage
