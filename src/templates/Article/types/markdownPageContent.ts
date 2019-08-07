/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: markdownPageContent
// ====================================================

export interface markdownPageContent_markdownRemark_frontmatter {
  __typename: "MarkdownRemarkFrontmatter";
  date: any | null;
  path: string | null;
  title: string | null;
  category: string | null;
}

export interface markdownPageContent_markdownRemark {
  __typename: "MarkdownRemark";
  html: string | null;
  timeToRead: number | null;
  frontmatter: markdownPageContent_markdownRemark_frontmatter | null;
}

export interface markdownPageContent {
  markdownRemark: markdownPageContent_markdownRemark | null;
}

export interface markdownPageContentVariables {
  path: string;
}
