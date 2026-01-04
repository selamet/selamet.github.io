import React from 'react'
import { Link } from 'gatsby'

import { ColorDropdown } from './ColorDropdown'
import floppyLogo from '../assets/nav-floppy.png'
import floppy from '../assets/floppylogo.png'
import blog from '../assets/nav-blog.png'
import projects from '../assets/nav-projects.png'
import github from '../assets/nav-github.png'
import { Moon } from './Icons/Moon'
import { Sun } from './Icons/Sun'

export const Sidebar = ({
  theme,
  handleUpdateTheme,
  currentColor,
  setCurrentColor,
}) => {
  const links = [
    { url: '/blog', label: 'Blog', image: projects },
    { url: '/notes', label: 'Notlar', image: blog },
    { url: '/projects', label: 'Projeler', image: github },
    { url: '/me', label: 'Hakkımda', image: floppy },
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
            <span className="site-name">Selamet Samli</span>
          </Link>
          <div className="flex-align-center">
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
        <h2>Hakkımda</h2>
        <div className="sidebar-content">
          <p>
            Ben <Link to="/me">Selamet</Link>, yazılım geliştircisiyim ve neon üretircisiyim. Burada bir takım teknik yazılar paylaşıyor olacağım 🌱
          </p>
        </div>
      </section>

      <section className="sidebar-section">
        <nav className="sidebar-nav-links">
          {links.map((link) => (
            <Link key={link.url} to={link.url} activeClassName="active">
              <img src={link.image} alt={link.label} />
              {link.label}
            </Link>
          ))}
        </nav>
      </section>

      <section className="sidebar-section">
        <h2>İletişim</h2>
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
