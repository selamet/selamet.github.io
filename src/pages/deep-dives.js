import React, { useMemo } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import projects from '../assets/nav-projects.png'
import { Hero } from '../components/Hero'
import { Layout } from '../components/Layout'
import { Search } from '../components/Search'
import { SEO } from '../components/SEO'
import { PageLayout } from '../components/PageLayout'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'

export default function DeepDives({ data }) {
  const posts = data?.posts?.edges || []
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const title = 'Deep Dives'
  const description =
    'Çeşitli geliştirme konularında uzun format öğreticiler ve derinlemesine incelemeler.'

  return (
    <>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO customDescription={description} />

      <PageLayout>
        <Hero title={title} description={description} hasSearch icon={projects} />
        <Search data={simplifiedPosts} section="deep-dives" />
      </PageLayout>
    </>
  )
}

DeepDives.Layout = Layout

export const deepDivesQuery = graphql`
  query DeepDivesQuery {
    posts: allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: { 
          template: { eq: "post" }
          categories: { eq: "Highlight" }
        }
      }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
