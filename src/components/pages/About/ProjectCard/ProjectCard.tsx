import * as React from 'react'

import { Link, Title, Text } from '@habx/lib-design-system'

import { Image, RatioBox } from '@components/atoms'

import {
  ProjectCardContainer,
  ProjectCardContent,
  ProjectCardInformation,
} from './ProjectCard.style'

const ProjectCard: React.FunctionComponent<ProjectCardProps> = ({
  title,
  image,
  endpoint,
  description,
}) => (
  <ProjectCardContainer>
    <Link newTab href={endpoint}>
      <ProjectCardContent animated>
        <RatioBox ratio={16 / 9}>
          <Image name={image} />
        </RatioBox>
        <ProjectCardInformation>
          <Title type="regular">{title}</Title>
          <Text>{description}</Text>
        </ProjectCardInformation>
      </ProjectCardContent>
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
