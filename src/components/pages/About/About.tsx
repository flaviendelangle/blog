import { get } from 'lodash'
import * as React from 'react'

import { Link } from '@habx/lib-design-system'

import Layout from '@components/structure/Layout'

import { useSiteMetadata } from './About.query'
import { ContactLinks, AboutTitle, ProjectCards } from './About.style'
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
      <ProjectCards>
        <ProjectCard
          title="Habx official website"
          image="habx-website.png"
          endpoint="https://www.habx.com/en"
          description="Official website of Habx. Built with NextJS and Styled Components"
        />
        <ProjectCard
          title="Thunder UI"
          image="thunder-ui.png"
          endpoint="https://github.com/habx/thunder-ui"
          description="UI Library optimized for back office applications and rich interfaces. Built with TypeScript and styled-components"
        />
        <ProjectCard
          title="Habx design system"
          image="habx-meta-share.png"
          endpoint="https://habx.github.io/lib-design-system/"
          description="UI Library optimized for static content and theme customizations. Built with TypeScript and styled-components"
        />
      </ProjectCards>
    </Layout>
  )
}

export default About
