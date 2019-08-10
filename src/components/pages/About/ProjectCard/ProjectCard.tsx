import * as React from 'react'

import { Card, Link, Title, Text } from '@habx/lib-design-system'

import { Image } from '@components/atoms'

import { ProjectCardContainer, ProjectCardContent } from './ProjectCard.style'

const ProjectCard: React.FunctionComponent<ProjectCardProps> = ({
  title,
  image,
  endpoint,
  description,
}) => (
  <ProjectCardContainer>
    <Link newTab href={endpoint}>
      <Card>
        <Image name={image} />
        <ProjectCardContent>
          <Title type="regular">{title}</Title>
          <Text>{description}</Text>
        </ProjectCardContent>
      </Card>
    </Link>
  </ProjectCardContainer>
)

interface ProjectCardProps {
  title: string
  description?: string
  image: string
  endpoint: string
}

export default ProjectCard
