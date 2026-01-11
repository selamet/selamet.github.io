import React, { useMemo, useState, useEffect } from 'react'
import { Link, graphql } from 'gatsby'

import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { Posts } from '../components/Posts'
import { SEO } from '../components/SEO'
import { Heading } from '../components/Heading'
import { Hero } from '../components/Hero'
import { PageLayout } from '../components/PageLayout'
import { projectsList } from '../data/projectsList'
import { getSimplifiedPosts } from '../utils/helpers'
import config from '../utils/config'
import { StarIcon } from '../components/Icons/StarIcon'
import newMoon from '../assets/nav-floppy.png'
import floppy from '../assets/floppylogo.png'

export default function Index({ data }) {
  const [repos, setRepos] = useState([])
  const latestNotes = data?.latestNotes?.edges || []
  const latestArticles = data?.latestArticles?.edges || []
  const highlights = data?.highlights?.edges || []
  const notes = useMemo(() => getSimplifiedPosts(latestNotes), [latestNotes])

  const articles = useMemo(
    () => getSimplifiedPosts(latestArticles),
    [latestArticles]
  )
  const simplifiedHighlights = useMemo(
    () => getSimplifiedPosts(highlights),
    [highlights]
  )

  useEffect(() => {
    async function getStars() {
      const repos = await fetch(
        'https://api.github.com/users/selamet/repos?per_page=100'
      )

      return repos.json()
    }

    getStars()
      .then((data) => {
        setRepos(data)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <>
      <Helmet title={config.siteTitle} />
      <SEO />

      <PageLayout>
        <Hero type="index">
          <div className="hero-wrapper">
            <div>
              <h1>Selam, ben Selamet!</h1>
              <div className="hero-quote">
                <p className="hero-quote-text">
                Keep Calm and Trust the Architecture
                </p>
              </div>
              <p className="hero-description">
                Python ile uğraşıyorum. Arada sistemler kuruyorum, arada
                sistemleri bozup neden bozulduğunu yazıyorum. Neon seviyorum, log
                seviyorum, <span className="prod-quote">"prod'da çalışıyor"</span>{' '}
                cümlesine mesafeliyim.
              </p>
              <div className="hero-buttons">
                <Link className="button" to="/me">
                  <img src={floppy} alt="Floppy Logo" /> Hakkımda
                </Link>
                <a
                  href="https://github.com/selamet"
                  className="button"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img src={newMoon} alt="GitHub" /> GitHub
                </a>
              </div>
            </div>
            <div className="hero-image-container">
              <div className="hero-background-shape" />
              <img src="/logo.png" className="hero-image" alt="Logo" />
            </div>
          </div>
        </Hero>

        <section className="section-index">
          <Heading
            title="Blog"
            description="Rehberler, referanslar ve öğreticiler."
          />
          <Posts data={articles} />
        </section>

        <section className="section-index">
          <Heading
            title="Notlar"
            description="Hayat, müzik, projeler ve diğer her şey."
          />
          <Posts data={notes} />
        </section>

        <section className="section-index">
          <Heading
            title="Öne Çıkanlar"
            slug="/topics"
            buttonText="Tüm Konular"
            description="Çeşitli geliştirme konularında uzun format öğreticiler."
          />
          <div className="cards">
            {simplifiedHighlights.map((post) => {
              return (
                <Link
                  to={post.slug}
                  className="card card-highlight"
                  key={`popular-${post.slug}`}
                >
                  <div>{post.title}</div>
                </Link>
              )
            })}
          </div>
        </section>

        <section>
          <Heading
            title="Projeler"
            slug="/projects"
            buttonText="Tüm Projeler"
            description="Yıllar boyunca üzerinde çalıştığım açık kaynak projeler."
          />

          <div className="cards">
            {projectsList
              .filter((project) => project.highlight)
              .map((project) => {
                const repo = repos.find((repo) => repo.name === project.slug)
                const starCount = repo ? repo.stargazers_count : 0

                return (
                  <div className="card" key={`hightlight-${project.slug}`}>
                    {repo && (
                      <div className="stars">
                        <div className="star">
                          <a
                            href={`https://github.com/selamet/${project.slug}/stargazers`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {Number(starCount).toLocaleString()}
                          </a>
                          <StarIcon />
                        </div>
                      </div>
                    )}
                    <time>{project.date}</time>
                    <a
                      href={`https://github.com/selamet/${project.slug}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.name}
                    </a>
                    <p>{project.tagline}</p>
                    <div className="card-links">
                      {project.writeup && (
                        <Link
                          className="button secondary small"
                          to={project.writeup}
                        >
                          Yazı
                        </Link>
                      )}
                      {project.url && (
                        <a
                          className="button secondary small"
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Uygulamaya Git
                        </a>
                      )}
                      <a
                        className="button secondary small"
                        href={`https://github.com/selamet/${project.slug}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Kaynak Kod
                      </a>
                    </div>
                  </div>
                )
              })}
          </div>
        </section>
      </PageLayout>
    </>
  )
}

Index.Layout = Layout

export const pageQuery = graphql`
  query IndexQuery {
    latestNotes: allMarkdownRemark(
      limit: 5
      sort: { frontmatter: { date: DESC } }
      filter: {
        frontmatter: {
          template: { eq: "post" }
          categories: { eq: "Personal" }
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
            tags
            categories
          }
        }
      }
    }
    latestArticles: allMarkdownRemark(
      limit: 5
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
            tags
            categories
          }
        }
      }
    }
    highlights: allMarkdownRemark(
      limit: 12
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { categories: { eq: "Highlight" } } }
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
            tags
          }
        }
      }
    }
  }
`
