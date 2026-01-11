import React, { useState, useEffect } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'

import { StarIcon } from '../components/Icons/StarIcon'
import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Hero } from '../components/Hero'
import { PageLayout } from '../components/PageLayout'
import config from '../utils/config'
import { projectsList } from '../data/projectsList'
import github from '../assets/nav-github.png'

export default function Projects() {
  const [repos, setRepos] = useState([])
  const title = 'Projeler'
  const description =
    'Geliştirdiğim projeler'

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
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO pagePath="/projects" />

      <PageLayout>
        <Hero title={title} description={description} icon={github} />

        <div className="cards">
          {projectsList.map((project) => {
            const repo = repos.find((repo) => repo.name === project.slug)
            const starCount = repo ? repo.stargazers_count : 0

            return (
              <div className="card" key={project.slug}>
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
                  className="card-header"
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
      </PageLayout>
    </>
  )
}

Projects.Layout = Layout
