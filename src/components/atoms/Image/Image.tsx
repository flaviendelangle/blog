import Img from 'gatsby-image'
import * as React from 'react'

import { useImage } from './Image.query'

const Image: React.FunctionComponent<ImageProps> = ({ name }) => {
  const image = useImage(name)

  return <Img fluid={image} />
}

interface ImageProps {
  name: string
}

export default Image
