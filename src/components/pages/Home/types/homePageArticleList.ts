/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: homePageArticleList
// ====================================================

export interface homePageArticleList_allMarkdownRemark_edges_node_frontmatter {
  __typename: "MarkdownRemarkFrontmatter";
  category: string | null;
  title: string | null;
  path: string | null;
  date: any | null;
}

export interface homePageArticleList_allMarkdownRemark_edges_node {
  __typename: "MarkdownRemark";
  id: string;
  excerpt: string | null;
  timeToRead: number | null;
  frontmatter: homePageArticleList_allMarkdownRemark_edges_node_frontmatter | null;
}

export interface homePageArticleList_allMarkdownRemark_edges {
  __typename: "MarkdownRemarkEdge";
  node: homePageArticleList_allMarkdownRemark_edges_node;
}

export interface homePageArticleList_allMarkdownRemark {
  __typename: "MarkdownRemarkConnection";
  edges: homePageArticleList_allMarkdownRemark_edges[];
}

export interface homePageArticleList {
  allMarkdownRemark: homePageArticleList_allMarkdownRemark;
}
