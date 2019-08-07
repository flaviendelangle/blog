import { graphql, useStaticQuery } from 'gatsby'
import { get } from 'lodash'

import {
  seoPageSiteMetadata,
  seoPageSiteMetadata_site_siteMetadata,
} from './types/seoPageSiteMetadata'

export const useSiteMetadata = (): seoPageSiteMetadata_site_siteMetadata => {
  const data = useStaticQuery<seoPageSiteMetadata>(
    graphql`
      query seoPageSiteMetadata {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  return get(data, 'site.siteMetadata')
}
