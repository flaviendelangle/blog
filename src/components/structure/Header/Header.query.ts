import { graphql, useStaticQuery } from 'gatsby'
import { get } from 'lodash'

import {
  headerSiteMetadata,
  headerSiteMetadata_site_siteMetadata,
} from './types/headerSiteMetadata'

export const useSiteMetadata = (): headerSiteMetadata_site_siteMetadata => {
  const data = useStaticQuery<headerSiteMetadata>(graphql`
    query headerSiteMetadata {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return get(data, 'site.siteMetadata')
}
