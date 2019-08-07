/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: aboutPageSiteMetadata
// ====================================================

export interface aboutPageSiteMetadata_site_siteMetadata_coordinates {
  __typename: "SiteSiteMetadataCoordinates";
  githubProfile: string | null;
}

export interface aboutPageSiteMetadata_site_siteMetadata {
  __typename: "SiteSiteMetadata";
  coordinates: aboutPageSiteMetadata_site_siteMetadata_coordinates | null;
}

export interface aboutPageSiteMetadata_site {
  __typename: "Site";
  siteMetadata: aboutPageSiteMetadata_site_siteMetadata | null;
}

export interface aboutPageSiteMetadata {
  site: aboutPageSiteMetadata_site | null;
}
