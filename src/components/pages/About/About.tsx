import { get } from 'lodash'
import * as React from 'react'

import { Link, Title } from '@habx/lib-design-system'

import Layout from '@components/structure/Layout'

import { useSiteMetadata } from './About.query'
import { ContactLinks, AboutTitle } from './About.style'
import ProjectCard from './ProjectCard'

const About: React.FunctionComponent<{}> = () => {
  const metadata = useSiteMetadata()

  return (
    <Layout title="About me">
      <AboutTitle>Contact</AboutTitle>
      <ContactLinks>
        <Link newTab href={get(metadata, 'coordinates.githubProfile')}>
          Github profile
        </Link>
      </ContactLinks>
      <AboutTitle>My Latest Projects</AboutTitle>
      <ProjectCard
        title="Habx official website"
        image="habx-website.png"
        endpoint="https://www.habx.com/en"
      />
      {/*
      <Resource>
        <Link newTab href="https://habx.github.io/thunder-ui/">
          Storybook @habx/thunder-ui
        </Link>
      </Resource>
      <Resource>
        <Link newTab href="https://habx.github.io/lib-design-system/">
          Storybook @habx/lib-design-system
        </Link>
      </Resource>
      */}
    </Layout>
  )
}

export default About
