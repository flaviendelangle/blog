import { get } from 'lodash'
import * as React from 'react'
import Helmet from 'react-helmet'

import { useSiteMetadata } from './Seo.query'

const Seo: React.FunctionComponent<SeoProps> = ({
  description = '',
  lang = 'en',
  meta = [],
  title,
}) => {
  const siteMetadata = useSiteMetadata()

  const metaDescription: string = description || siteMetadata.description || ''

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: get(siteMetadata, 'author', '') as string,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

interface SeoProps {
  lang?: string
  meta?: { name: string; content: string }[]
  description?: string
  title: string
}

export default Seo
