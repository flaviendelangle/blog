import { graphql, useStaticQuery } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import { get, find } from 'lodash'

import { imageSharp } from './types/imageSharp'

export const useImage = (imageName: string): FluidObject => {
  const data = useStaticQuery<imageSharp>(graphql`
    query imageSharp {
      allImageSharp {
        edges {
          node {
            fluid(maxWidth: 500) {
              base64
              aspectRatio
              src
              srcSet
              sizes
              originalName
            }
          }
        }
      }
    }
  `)

  return get(
    find(
      get(data, 'allImageSharp.edges'),
      el => get(el, 'node.fluid.originalName') === imageName
    ),
    'node.fluid'
  )
}
