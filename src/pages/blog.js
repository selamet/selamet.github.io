import React, { useMemo } from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Hero } from '../components/Hero'
import { Layout } from '../components/Layout'
import { Search } from '../components/Search'
import { SEO } from '../components/SEO'
import { PageLayout } from '../components/PageLayout'
import { getSimplifiedPosts } from '../utils/helpers'
import projects from '../assets/nav-projects.png'
import config from '../utils/config'
import { useLanguage } from '../context/LanguageContext'

export default function Blog({ data }) {
  const { t } = useLanguage()
  const posts = data?.posts?.edges || []
  const simplifiedPosts = useMemo(() => getSimplifiedPosts(posts), [posts])
  const title = t('blog.title')

  const description = (
    <div>
      {t('blog.description')}
      <Link to="/topics">{t('blog.viewAllTopics')}</Link>
    </div>
  )

  return (
    <>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO customDescription={description} pagePath="/blog" />
      <PageLayout>
        <Hero title={title} description={description} hasSearch icon={projects} />

        <Search data={simplifiedPosts} section="blog" />
      </PageLayout>
    </>
  )
}

Blog.Layout = Layout

export const articlesQuery = graphql`
  query BlogQuery {
    posts: allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: {
          template: { eq: "post" }
          categories: { eq: "Technical" }
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
