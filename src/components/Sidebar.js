import React from 'react'
import { Link } from 'gatsby'

import { ColorDropdown } from './ColorDropdown'
import floppyLogo from '../assets/nav-floppy.png'
import { Terminal, FileText, Code2, CircleUser, Globe } from 'lucide-react'
import { Moon } from './Icons/Moon'
import { Sun } from './Icons/Sun'
import { useLanguage } from '../context/LanguageContext'

export const Sidebar = ({
  theme,
  handleUpdateTheme,
  currentColor,
  setCurrentColor,
}) => {
  const { lang, toggleLang, t } = useLanguage()

  const links = [
    { url: '/blog', label: t('nav.blog'), icon: Terminal },
    { url: '/notes', label: t('nav.notes'), icon: FileText },
    { url: '/projects', label: t('nav.projects'), icon: Code2 },
    { url: '/me', label: t('nav.about'), icon: CircleUser },
  ]

  return (
    <aside className="sidebar">
      <section className="sidebar-section">
        <div className="sidebar-title-link">
          <Link to="/" className="flex-align-center gap">
            <span>
              <img
                src={floppyLogo}
                className="navbar-logo"
                alt="selamet.dev"
                title="💾"
                height="16"
                width="16"
              />
            </span>
            <span className="site-name">Selamet's Diary</span>
          </Link>
          <div className="flex-align-center">
            <div className="tooltip-container">
              <button className="navbar-button" onClick={toggleLang}>
                <Globe size={16} />
              </button>
              <div className="tooltip">{lang === 'tr' ? 'EN' : 'TR'}</div>
            </div>
            <ColorDropdown
              currentColor={currentColor}
              setCurrentColor={setCurrentColor}
            />
            <div className="tooltip-container">
              <button
                className="navbar-button"
                onClick={() => {
                  const newTheme = theme === 'dark' ? 'light' : 'dark'
                  handleUpdateTheme(newTheme)
                }}
              >
                {theme === 'dark' ? <Sun /> : <Moon />}
              </button>
              <div className="tooltip">Theme</div>
            </div>
          </div>
        </div>
      </section>

      <section className="sidebar-section">
        <h2>{t('sidebar.about')}</h2>
        <div className="sidebar-content">
          <p>{t('sidebar.bio')}</p>
        </div>
      </section>

      <section className="sidebar-section">
        <nav className="sidebar-nav-links">
          {links.map((link) => (
            <Link key={link.url} to={link.url} activeClassName="active">
              <link.icon size={15} />
              {link.label}
            </Link>
          ))}
        </nav>
      </section>

      <section className="sidebar-section">
        <h2>{t('sidebar.contact')}</h2>
        <p className="sidebar-links">
          <a
            href="https://github.com/selamet"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com/selametsamli"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a href="/rss.xml">RSS</a>
        </p>
      </section>
    </aside>
  )
}
