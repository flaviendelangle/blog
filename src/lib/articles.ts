export type category = {
  title: string
}

export const DEFAULT_CATEGORY: category = {
  title: 'ReactJS',
}
export const CATEGORIES: { [key: string]: category } = {
  ssr: {
    title: 'One year with NextJS',
  },
  designSystem: {
    title: 'Building a design system',
  },
}
