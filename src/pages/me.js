import React from 'react'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Hero } from '../components/Hero'
import { PageLayout } from '../components/PageLayout'
import config from '../utils/config'
import { useLanguage } from '../context/LanguageContext'

export default function Me() {
  const { lang, t } = useLanguage()
  const title = t('about.title')

  return (
    <>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO />

      <PageLayout>

        <section className="section-about">
          <h2>{t('about.sectionAbout')}</h2>
          <div className="about-content">
            <div className="about-text">
              <div className="about-intro">
                {lang === 'tr' ? (
                  <>
                    <p>
                      Ben Selamet. Yaklaşık <strong>9 yıldır</strong> yazılım
                      dünyasının içindeyim. Son <strong>6 yıldır</strong>{' '}
                      profesyonel olarak farklı şirketlerde çalışıyorum.
                    </p>
                    <p>
                      Bir hobi olarak başladığım <strong>neon</strong> üretimini,
                      artık profesyonel olarak yapıyorum. Çalışmalarımı{' '}
                      <a
                        href="https://instagram.com/neoonlush"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-highlight"
                      >
                        @neoonlush
                      </a>{' '}
                      Instagram hesabında paylaşıyorum.
                    </p>
                    <p>
                      Şu sıralar{' '}
                      <a
                        href="https://heybooster.ai"
                        target="_blank"
                        rel="noopener"
                        referrerPolicy="origin"
                        className="link-highlight"
                      >
                        heybooster
                      </a>
                      'da <strong>Backend Developer</strong> olarak çalışıyorum.
                      Günlerim sistemleri optimize etmek, sıfırdan ölçeklenebilir
                      sistemler tasarlamak, performans iyileştirmeleri ve mimari
                      kararlar almakla geçiyor.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      I'm Selamet. I've been in the software world for about{' '}
                      <strong>9 years</strong>, working professionally at
                      different companies for the last <strong>6 years</strong>.
                    </p>
                    <p>
                      What started as a hobby — making <strong>neon</strong>{' '}
                      signs — has become a professional pursuit as well. I share
                      my work on{' '}
                      <a
                        href="https://instagram.com/neoonlush"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-highlight"
                      >
                        @neoonlush
                      </a>{' '}
                      on Instagram.
                    </p>
                    <p>
                      Currently working as a <strong>Backend Developer</strong>{' '}
                      at{' '}
                      <a
                        href="https://heybooster.ai"
                        target="_blank"
                        rel="noopener"
                        referrerPolicy="origin"
                        className="link-highlight"
                      >
                        heybooster
                      </a>
                      . My days are spent optimizing systems, designing scalable
                      architectures from scratch, improving performance, and
                      making architectural decisions.
                    </p>
                  </>
                )}
              </div>

              <div className="about-goals">
                {lang === 'tr' ? (
                  <p>
                    2026 için hedeflerim: daha fazla <strong>yazmak</strong>,{' '}
                    öğrendiklerimi <strong>paylaşmak</strong> ve gerçekten
                    kullandığım teknolojiler hakkında{' '}
                    <strong>teknik yazılar</strong> üretmek. Bu blog da bu
                    niyetle ortaya çıktı.
                  </p>
                ) : (
                  <p>
                    My goals for 2026: <strong>write more</strong>,{' '}
                    <strong>share</strong> what I learn, and produce{' '}
                    <strong>technical articles</strong> about technologies I
                    actually use. That's what this blog is for.
                  </p>
                )}
              </div>

              <div className="about-topics">
                <p className="topics-intro">{t('about.topicsIntro')}</p>
                <ul className="topics-list">
                  {t('about.topics').map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="about-approach">
                {lang === 'tr' ? (
                  <p>
                    Yazılar daha çok <strong>pratik</strong> olacak.
                    Dokümantasyon tekrarı yerine, "ben bunu nerede kullandım, ne
                    işe yaradı, nerede canımı sıktı" gibi deneyimlere dayanacak.
                  </p>
                ) : (
                  <p>
                    Posts will be mostly <strong>practical</strong>. Instead of
                    rehashing docs, they'll be based on real experience — where I
                    used it, how it helped, where it frustrated me.
                  </p>
                )}
              </div>
            </div>
            <div className="about-photo">
              <Hero type="index">
                <div className="hero-image-container">
                  <div className="hero-background-shape" />
                  <img src="/logo.png" className="hero-image" alt="Logo" />
                </div>
              </Hero>
            </div>
          </div>
          <blockquote className="quotation quotation-neon">
            <p>{t('about.quotation')}</p>
            <footer>— Selamet</footer>
          </blockquote>
          <div className="photo-gallery">
            <img src="/me-photo-1.JPG" alt="Fotoğraf 1" className="photo-gallery-item" />
            <img src="/me-photo-2.JPG" alt="Fotoğraf 2" className="photo-gallery-item" />
          </div>
        </section>

        <section className="section-about">
          <h2>{t('about.techStack')}</h2>
          <div className="tech-stack">
            <div className="tech-category">
              <h3>Backend Frameworks</h3>
              <div className="tech-tags">
                <span className="tech-tag tech-tag-favorite">Python</span>
                <span className="tech-tag tech-tag-favorite">FastAPI</span>
                <span className="tech-tag">Django</span>
                <span className="tech-tag">Django REST Framework</span>
                <span className="tech-tag">Flask</span>
              </div>
            </div>

            <div className="tech-category">
              <h3>Message Queues & Task Processing</h3>
              <div className="tech-tags">
                <span className="tech-tag tech-tag-favorite">Celery</span>
                <span className="tech-tag">Redis</span>
                <span className="tech-tag">RabbitMQ</span>
                <span className="tech-tag">AWS SQS</span>
              </div>
            </div>

            <div className="tech-category">
              <h3>Databases</h3>
              <div className="tech-tags">
                <span className="tech-tag tech-tag-favorite">PostgreSQL</span>
                <span className="tech-tag">MySQL</span>
                <span className="tech-tag">MongoDB</span>
                <span className="tech-tag">Elasticsearch</span>
                <span className="tech-tag">AWS OpenSearch</span>
                <span className="tech-tag">AWS DynamoDB</span>
              </div>
            </div>

            <div className="tech-category">
              <h3>AWS Services</h3>
              <div className="tech-tags">
                <span className="tech-tag">AWS Lambda</span>
                <span className="tech-tag tech-tag-favorite">AWS ECS</span>
                <span className="tech-tag">AWS S3</span>
                <span className="tech-tag">AWS SQS</span>
                <span className="tech-tag">AWS OpenSearch</span>
                <span className="tech-tag">AWS DynamoDB</span>
              </div>
            </div>

            <div className="tech-category">
              <h3>Infrastructure & Architecture</h3>
              <div className="tech-tags">
                <span className="tech-tag tech-tag-favorite">Docker</span>
                <span className="tech-tag tech-tag-favorite">Git</span>
                <span className="tech-tag">Event-driven Architecture</span>
                <span className="tech-tag">Distributed Systems</span>
                <span className="tech-tag">Query Optimization</span>
                <span className="tech-tag">Caching</span>
                <span className="tech-tag">Logging & Monitoring</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-about">
          <h2>{t('about.contact')}</h2>
          <div className="contact-section">
            <p className="contact-intro">{t('about.contactIntro')}</p>
            <div className="contact-links">
              <a
                href="mailto:selametsamli@gmail.com"
                className="button contact-button"
              >
                Email
              </a>
              <a
                href="https://github.com/selamet"
                target="_blank"
                rel="noopener noreferrer"
                className="button contact-button"
              >
                GitHub
              </a>
              <a
                href="https://twitter.com/selametsamli"
                target="_blank"
                rel="noopener noreferrer"
                className="button contact-button"
              >
                Twitter
              </a>
              <a
                href="https://www.linkedin.com/in/selametsamli/"
                target="_blank"
                rel="noopener noreferrer"
                className="button contact-button"
              >
                LinkedIn
              </a>
              <a
                href="/selamet_samli_cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="button contact-button contact-button-cv"
              >
                {t('about.cvDownload')}
              </a>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  )
}

Me.Layout = Layout

