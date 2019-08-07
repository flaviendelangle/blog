import { graphql, useStaticQuery } from 'gatsby'
import { get } from 'lodash'

import {
  aboutPageSiteMetadata,
  aboutPageSiteMetadata_site_siteMetadata,
} from './types/aboutPageSiteMetadata'

export const useSiteMetadata = (): aboutPageSiteMetadata_site_siteMetadata => {
  const data = useStaticQuery<aboutPageSiteMetadata>(graphql`
    query aboutPageSiteMetadata {
      site {
        siteMetadata {
          coordinates {
            githubProfile
          }
        }
      }
    }
  `)

  return get(data, 'site.siteMetadata')
}
