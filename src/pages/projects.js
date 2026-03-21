import React, { useState, useEffect } from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import { ExternalLink, Star, Github } from 'lucide-react'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Hero } from '../components/Hero'
import { PageLayout } from '../components/PageLayout'
import config from '../utils/config'
import { projectsList } from '../data/projectsList'
import { useLanguage } from '../context/LanguageContext'

export default function Projects() {
  const { t, lang } = useLanguage()
  const [repos, setRepos] = useState([])
  const title = t('projects.title')
  const description = t('projects.description')

  useEffect(() => {
    async function getStars() {
      const repos = await fetch(
        'https://api.github.com/users/selamet/repos?per_page=100'
      )
      return repos.json()
    }

    getStars()
      .then((data) => setRepos(data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO pagePath="/projects" />

      <PageLayout>
        <Hero title={title} description={description} />

        <div className="project-cards">
          {projectsList.map((project) => {
            const repo = repos.find((repo) => repo.name === project.slug)
            const starCount = repo ? repo.stargazers_count : 0
            const tagline = lang === 'en' && project.tagline_en ? project.tagline_en : project.tagline

            return (
              <div
                className="project-card"
                key={project.slug}
                style={{ '--project-accent': project.accent }}
              >
                <div className="project-card-body">
                  <div className="project-card-meta">
                    <time>{project.date}</time>
                    {repo && starCount > 0 && (
                      <a
                        className="project-stars"
                        href={`https://github.com/selamet/${project.slug}/stargazers`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Star size={12} />
                        {Number(starCount).toLocaleString()}
                      </a>
                    )}
                  </div>

                  <a
                    className="project-card-name"
                    href={`https://github.com/selamet/${project.slug}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.name}
                  </a>

                  <p className="project-card-tagline">{tagline}</p>

                  {project.stack && (
                    <div className="project-stack">
                      {project.stack.map((tech) => (
                        <span key={tech} className="project-stack-tag">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="project-card-links">
                  {project.writeup && (
                    <Link className="button secondary small" to={project.writeup}>
                      {t('projects.writeup')}
                    </Link>
                  )}
                  {project.url && (
                    <a
                      className="button secondary small"
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink size={12} />
                      {t('projects.liveDemo')}
                    </a>
                  )}
                  <a
                    className="button secondary small"
                    href={`https://github.com/selamet/${project.slug}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github size={12} />
                    {t('projects.sourceCode')}
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
