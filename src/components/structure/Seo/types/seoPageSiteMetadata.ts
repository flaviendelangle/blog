/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seoPageSiteMetadata
// ====================================================

export interface seoPageSiteMetadata_site_siteMetadata {
  __typename: "SiteSiteMetadata";
  title: string | null;
  description: string | null;
  author: string | null;
}

export interface seoPageSiteMetadata_site {
  __typename: "Site";
  siteMetadata: seoPageSiteMetadata_site_siteMetadata | null;
}

export interface seoPageSiteMetadata {
  site: seoPageSiteMetadata_site | null;
}
