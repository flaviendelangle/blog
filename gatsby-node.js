const fs = require('fs')
const { introspectionQuery, graphql } = require('gatsby/graphql')
const { createFilePath } = require(`gatsby-source-filesystem`)
const { buildClientSchema, printSchema } = require('graphql/utilities')
const path = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@lib': path.resolve(__dirname, 'src/lib'),
        '@style': path.resolve(__dirname, 'src/style'),
      },
    },
  })
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/Article/index.ts`)
  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    return result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {}, // additional data can be passed via context
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.onPostBootstrap = async ({ store }) => {
  const { schema } = store.getState()

  const response = await graphql(schema, introspectionQuery)
  const cleanSchema = printSchema(buildClientSchema(response.data))
  fs.writeFileSync('./schema.graphql', cleanSchema)
}
