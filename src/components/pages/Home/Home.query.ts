import { graphql, useStaticQuery } from 'gatsby'
import { get } from 'lodash'

import {
  homePageArticleList,
  homePageArticleList_allMarkdownRemark_edges,
} from './types/homePageArticleList'

export const useArticleList = (): homePageArticleList_allMarkdownRemark_edges[] => {
  const data = useStaticQuery<homePageArticleList>(graphql`
    query homePageArticleList {
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

  return get(data, 'allMarkdownRemark.edges')
}
