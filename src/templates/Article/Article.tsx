import * as React from 'react'

import { Title, Text } from '@habx/lib-design-system'

import Layout from '@components/structure/Layout'

import { CATEGORIES, DEFAULT_CATEGORY } from '@lib/articles'

import { ArticleMarkdown } from './Article.style'

const Article: React.FunctionComponent<ArticleProps> = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html, timeToRead } = markdownRemark

  const category = CATEGORIES[frontmatter.category] || DEFAULT_CATEGORY

  return (
    <Layout title={category.title} width="small">
      <Title type="headerSmall">{frontmatter.title}</Title>
      <Text>
        {frontmatter.date} - {timeToRead}min read{' '}
      </Text>
      <ArticleMarkdown>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </ArticleMarkdown>
    </Layout>
  )
}

interface ArticleProps {
  data: {
    markdownRemark: {
      html: string
      timeToRead: number
      frontmatter: {
        date: string
        path: string
        title: string
        category: string
      }
    }
  }
}

export default Article
