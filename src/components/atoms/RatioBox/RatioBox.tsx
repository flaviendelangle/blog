import PropTypes from 'prop-types'
import React from 'react'

import { RatioContainer, RatioContent } from './RatioBox.style'

const RatioBox: React.FunctionComponent<RatioBoxProps> = ({
  ratio,
  children,
}) => (
  <RatioContainer ratio={ratio}>
    <RatioContent>{children}</RatioContent>
  </RatioContainer>
)

interface RatioBoxProps {
  ratio: number
}

export default RatioBox
