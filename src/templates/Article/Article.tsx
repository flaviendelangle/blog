import * as React from 'react'

import Layout from '@components/Layout'

import { ArticleMarkdown } from './Article.style'

const Article: React.FunctionComponent<ArticleProps> = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout
      title={frontmatter.title}
      subtitle={frontmatter.subtitle}
      width="small"
    >
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
      frontmatter: {
        date: string
        path: string
        title: string
        subtitle: string
      }
    }
  }
}

export default Article
