import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { PageLayout } from '../components/PageLayout'
import { SEO } from '../components/SEO'
import { Hero } from '../components/Hero'
import config from '../utils/config'
import floppy from '../assets/floppylogo.png'

export default function FourOhFour() {
  return (
    <>
      <Helmet title={`404 | ${config.siteTitle}`} />
      <SEO />

      <PageLayout>
        <Hero type="index">
          <div className="hero-wrapper">
            <div>
              <h1>404</h1>
              <p className="hero-description">
                Üzgünüm, aradığınız sayfa bulunamadı. Belki de hiç var olmadı?
              </p>
              <p className="hero-description">
                Ana sayfaya dönmek için aşağıdaki butona tıklayabilirsiniz.
              </p>
              <p
                className="flex-wrap flex-align-center gap"
                style={{ marginBottom: 0 }}
              >
                <Link className="button" to="/">
                  <img src={floppy} alt="Floppy Logo" /> Ana Sayfaya Dön
                </Link>
              </p>
            </div>
            <div className="hero-image-container">
              <div className="hero-background-shape" />
              <img src="/logo.png" className="hero-image" alt="Logo" />
            </div>
          </div>
        </Hero>
      </PageLayout>
    </>
  )
}

FourOhFour.Layout = Layout
