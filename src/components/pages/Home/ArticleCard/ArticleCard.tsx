import { Link } from 'gatsby'
import { get } from 'lodash'
import * as React from 'react'

import { Text, Title } from '@habx/lib-design-system'

import { CATEGORIES } from '@lib/articles'

import { homePageArticleList_allMarkdownRemark_edges_node } from '../types/homePageArticleList'

import { ArticleContainer, ArticleDate } from './ArticleCard.style'

const ArticleCard: React.FunctionComponent<ArticleCardProps> = ({
  article,
}) => {
  const categoryTitle =
    get(CATEGORIES[get(article, 'frontmatter.category')], 'title') || ''

  const articleTitle = get(article, 'frontmatter.title')

  return (
    <Link to={get(article, 'frontmatter.path')}>
      <ArticleContainer>
        <Title type="section" primary>
          {categoryTitle ? `${categoryTitle}: ${articleTitle}` : articleTitle}
        </Title>
        <ArticleDate type="caption">
          {get(article, 'frontmatter.date')} - {get(article, 'timeToRead')}min
          read
        </ArticleDate>
        <Text>{article.excerpt}</Text>
      </ArticleContainer>
    </Link>
  )
}

interface ArticleCardProps {
  article: homePageArticleList_allMarkdownRemark_edges_node
}

export default ArticleCard
