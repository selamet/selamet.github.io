import React from 'react'

import gatsby from '../assets/gatsby.png'
import github from '../assets/nav-github.png'

const links = [
  { url: 'https://github.com/selamet', label: 'GitHub' },
  { url: 'https://twitter.com/selametsamli', label: 'Twitter' },
  { url: '/rss.xml', label: 'RSS' },
]
const madeWithLinks = [
  { url: 'https://www.gatsbyjs.org', label: 'Gatsby', icon: gatsby },
  { url: 'https://github.com/selamet', label: 'GitHub', icon: github },
]

export const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer-section">
        <nav className="footer-menu">
          {links.map((link) => (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
              className="footer-link"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <nav className="footer-menu-buttons">
          {madeWithLinks.map((link) => (
            <a
              href={link.url}
              title={link.label}
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
              className="button small"
            >
              <img src={link.icon} alt={link.label} />
              <span>{link.label}</span>
            </a>
          ))}
        </nav>
        <div className="footer-made-by">Made with ❤️ by Selamet Samli</div>
      </section>
    </footer>
  )
}

