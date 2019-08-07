import { graphql } from 'gatsby'

import Article from './Article'

export const pageQuery = graphql`
  query markdownPageContent($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        category
      }
    }
  }
`

export default Article
