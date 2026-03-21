import React, { useState } from 'react'
import Helmet from 'react-helmet'
import { Code2, Palette, GitBranch } from 'lucide-react'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Hero } from '../components/Hero'
import { PageLayout } from '../components/PageLayout'
import { PuzzleChallenge } from '../components/PuzzleChallenge'
import config from '../utils/config'
import { projectsList } from '../data/projectsList'
import { useLanguage } from '../context/LanguageContext'

const typeIcon = {
  backend: Code2,
  frontend: Palette,
}

const typeLabel = {
  backend: 'Backend Challenge',
  frontend: 'Frontend Challenge',
}

export default function Collaborate() {
  const { lang } = useLanguage()
  const [activeProject, setActiveProject] = useState(null)

  const projectsWithPuzzles = projectsList.filter((p) => p.puzzle)

  return (
    <>
      <Helmet title={`Collaborate | ${config.siteTitle}`} />
      <SEO pagePath="/collaborate" />

      <PageLayout>
        <Hero
          title={lang === 'tr' ? 'Birlikte Geliştir' : 'Collaborate'}
          description={
            lang === 'tr'
              ? 'Açık kaynak projelerime katkıda bulunmak ister misin? Her proje için küçük bir bulmaca çöz, çözümünü gönder — seninle iletişime geçeyim.'
              : "Want to contribute to my open source projects? Solve a small puzzle for each project, send your solution, and I'll reach out."
          }
        />

        <div className="collaborate-grid">
          {projectsWithPuzzles.map((project) => {
            const Icon = typeIcon[project.puzzle.type] || Code2
            const tagline = lang === 'en' && project.tagline_en ? project.tagline_en : project.tagline

            return (
              <div
                className="collaborate-card"
                key={project.slug}
                style={{ '--project-accent': project.accent }}
              >
                <div className="collaborate-card-top">
                  <div className="collaborate-card-badge">
                    <Icon size={13} />
                    {typeLabel[project.puzzle.type]}
                  </div>
                  <h3 className="collaborate-card-name">{project.name}</h3>
                  <p className="collaborate-card-tagline">{tagline}</p>
                </div>

                <div className="collaborate-card-puzzle">
                  <div className="collaborate-puzzle-title">
                    <GitBranch size={13} />
                    {project.puzzle.title}
                  </div>
                  <p className="collaborate-puzzle-desc">
                    {project.puzzle.description.split('\n')[0]}
                  </p>
                  {project.stack && (
                    <div className="project-stack" style={{ marginTop: '0.75rem' }}>
                      {project.stack.map((tech) => (
                        <span key={tech} className="project-stack-tag">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  className="button primary collaborate-start-btn"
                  onClick={() => setActiveProject(project)}
                >
                  {lang === 'tr' ? 'Bulmacayı Çöz' : 'Start Challenge'}
                </button>
              </div>
            )
          })}
        </div>
      </PageLayout>

      {activeProject && (
        <PuzzleChallenge
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  )
}

Collaborate.Layout = Layout
