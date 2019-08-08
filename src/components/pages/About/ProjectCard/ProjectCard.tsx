import * as React from 'react'

import { Link, Title } from '@habx/lib-design-system'

import { Image } from '@components/atoms'

import { ProjectCardContainer } from './ProjectCard.style'

const ProjectCard: React.FunctionComponent<ProjectCardProps> = ({
  title,
  image,
  endpoint,
}) => (
  <Link newTab href={endpoint}>
    <ProjectCardContainer>
      <Image name={image} />
      <Title type="section">{title}</Title>
    </ProjectCardContainer>
  </Link>
)

interface ProjectCardProps {
  title: string
  image: string
  endpoint: string
}

export default ProjectCard
