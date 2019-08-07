/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: headerSiteMetadata
// ====================================================

export interface headerSiteMetadata_site_siteMetadata {
  __typename: "SiteSiteMetadata";
  title: string | null;
}

export interface headerSiteMetadata_site {
  __typename: "Site";
  siteMetadata: headerSiteMetadata_site_siteMetadata | null;
}

export interface headerSiteMetadata {
  site: headerSiteMetadata_site | null;
}
