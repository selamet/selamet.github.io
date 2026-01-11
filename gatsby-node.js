const path = require('path')

// Schema Customization
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter!
      fields: MarkdownRemarkFields
    }

    type MarkdownRemarkFrontmatter {
      title: String
      date: Date @dateformat
      category: String
      categories: [String]
      tags: [String]
      description: String
      featured: Boolean
      template: String
      slug: String
      comments_off: Boolean
      thumbnail: File @fileByRelativePath
    }

    type MarkdownRemarkFields {
      slug: String
      category: String
    }
  `
  createTypes(typeDefs)
}

// Helpers
function slugify(str) {
  return (
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.toLowerCase())
      .join('-')
  )
}

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPage = path.resolve('./src/templates/post.js')
  const pagePage = path.resolve('./src/templates/page.js')
  const tagPage = path.resolve('./src/templates/topic.js')
  const categoryPage = path.resolve('./src/templates/category.js')

  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
          edges {
            node {
              id
              frontmatter {
                title
                tags
                categories
                template
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const all = result.data.allMarkdownRemark.edges
  const posts = all.filter((post) => post.node.frontmatter.template === 'post')
  const pages = all.filter((post) => post.node.frontmatter.template === 'page')
  const tagSet = new Set()
  const categorySet = new Set()

  // =====================================================================================
  // Posts
  // =====================================================================================

  posts.forEach((post, i) => {
    const previous = i === posts.length - 1 ? null : posts[i + 1].node
    const next = i === 0 ? null : posts[i - 1].node

    if (post.node.frontmatter.tags) {
      post.node.frontmatter.tags.forEach((tag) => {
        tagSet.add(tag)
      })
    }

    if (post.node.frontmatter.categories) {
      post.node.frontmatter.categories.forEach((category) => {
        categorySet.add(category)
      })
    }

    createPage({
      path: post.node.fields.slug,
      component: blogPage,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  // =====================================================================================
  // Pages
  // =====================================================================================

  pages.forEach((page) => {
    createPage({
      path: page.node.fields.slug,
      component: pagePage,
      context: {
        slug: page.node.fields.slug,
        thumbnail: page.node.frontmatter.thumbnail,
      },
    })
  })

  // =====================================================================================
  // Tags
  // =====================================================================================

  const tagList = Array.from(tagSet)
  tagList.forEach((tag) => {
    createPage({
      path: `/topics/${slugify(tag)}/`,
      component: tagPage,
      context: {
        tag,
      },
    })
  })

  // =====================================================================================
  // Categories
  // =====================================================================================

  const categoryList = Array.from(categorySet)
  categoryList.forEach((category) => {
    createPage({
      path: `/categories/${slugify(category)}/`,
      component: categoryPage,
      context: {
        category,
      },
    })
  })
}

const createNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // =====================================================================================
  // Slugs
  // =====================================================================================

  let slug
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)

    if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')) {
      slug = `/${node.frontmatter.slug}/`
    } else {
      const fileName = parsedFilePath.name
      if (parsedFilePath.dir) {
        slug = `/${parsedFilePath.dir}/${fileName}/`
      } else {
        slug = `/${fileName}/`
      }
    }

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    })

    // Category field'ını ekle
    const category = node.frontmatter?.category || parsedFilePath.dir || 'blog'
    createNodeField({
      name: 'category',
      node,
      value: category,
    })
  }
}

exports.createPages = createPages
exports.onCreateNode = createNode
