/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: imageSharp
// ====================================================

export interface imageSharp_allImageSharp_edges_node_fluid {
  __typename: "ImageSharpFluid";
  base64: string | null;
  aspectRatio: number | null;
  src: string | null;
  srcSet: string | null;
  sizes: string | null;
  originalName: string | null;
}

export interface imageSharp_allImageSharp_edges_node {
  __typename: "ImageSharp";
  fluid: imageSharp_allImageSharp_edges_node_fluid | null;
}

export interface imageSharp_allImageSharp_edges {
  __typename: "ImageSharpEdge";
  node: imageSharp_allImageSharp_edges_node;
}

export interface imageSharp_allImageSharp {
  __typename: "ImageSharpConnection";
  edges: imageSharp_allImageSharp_edges[];
}

export interface imageSharp {
  allImageSharp: imageSharp_allImageSharp | null;
}
