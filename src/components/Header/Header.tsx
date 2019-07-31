import { Link } from 'gatsby'
import * as React from 'react'

import { Title, Text, palette } from '@habx/lib-design-system'

import Seo from '@components/Seo'

import { HeaderContainer, HeaderContent, HeaderLine } from './Header.style'

const Header: React.FunctionComponent<HeaderProps> = ({ title }) => (
  <HeaderContainer backgroundColor={palette.blue[400]}>
    <Seo title={title} />
    <HeaderContent>
      <HeaderLine>
        <Link to="/">
          <Title type="section">React Blog</Title>
        </Link>
        <Text>
          Created by <Link to="/about">Flavien DELANGLE</Link>
        </Text>
      </HeaderLine>
      <Title type="header">{title}</Title>
    </HeaderContent>
  </HeaderContainer>
)

interface HeaderProps {
  title: string
}

export default Header
