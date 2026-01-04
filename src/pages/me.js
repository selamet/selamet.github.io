import React from 'react'
import Helmet from 'react-helmet'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Hero } from '../components/Hero'
import { PageLayout } from '../components/PageLayout'
import config from '../utils/config'

export default function Me() {
  const title = 'Hakkımda'

  return (
    <>
      <Helmet title={`${title} | ${config.siteTitle}`} />
      <SEO />

      <PageLayout>

        <section className="section-about">
          <h2>Hakkımda</h2>
          <div className="about-content">
            <div className="about-text">
              <div className="about-intro">
                <p>
                  Ben Selamet. Yaklaşık <strong>9 yıldır</strong> yazılım dünyasının içindeyim.
                  Son <strong>6 yıldır</strong> profesyonel olarak farklı şirketlerde çalışıyorum.
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
                  Şu sıralar <a href="https://heybooster.ai" target="_blank" rel="noopener" referrerPolicy="origin" className="link-highlight">heybooster</a>'da{' '}
                  <strong>Backend Developer</strong> olarak çalışıyorum.
                  Günlerim sistemleri optimize etmek, sıfırdan ölçeklenebilir
                  sistemler tasarlamak, performans iyileştirmeleri ve
                  mimari kararlar almakla geçiyor.
                </p>
              </div>

              <div className="about-goals">
                <p>
                  2026 için hedeflerim: daha fazla <strong>yazmak</strong>,{' '}
                  öğrendiklerimi <strong>paylaşmak</strong> ve
                  gerçekten kullandığım teknolojiler hakkında{' '}
                  <strong>teknik yazılar</strong> üretmek.
                  Bu blog da bu niyetle ortaya çıktı.
                </p>
              </div>

              <div className="about-topics">
                <p className="topics-intro">Burada ağırlıklı olarak şunlardan bahsedeceğim:</p>
                <ul className="topics-list">
                  <li>Sistem mimarileri ve gerçek hayatta nasıl kurgulandıkları</li>
                  <li>Backend tarafında sık kullanılan araçlar ve detayları</li>
                  <li>Bir tool'un ne zaman işe yaradığı, ne zaman yaramadığı</li>
                  <li>Prod ortamda yaşanan problemler ve bunlarla baş etme yolları</li>
                </ul>
              </div>

              <div className="about-approach">
                <p>
                  Yazılar daha çok <strong>pratik</strong> olacak.
                  Dokümantasyon tekrarı yerine, "ben bunu nerede kullandım,
                  ne işe yaradı, nerede canımı sıktı" gibi deneyimlere dayanacak.
                </p>
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
            <p>
              Karanlık editörlerde yazılan her kod, neon ışıltısına ihtiyaç duyar.
            </p>
            <footer>— Selamet</footer>
          </blockquote>
          <div className="photo-gallery">
            <img src="/me-photo-1.JPG" alt="Fotoğraf 1" className="photo-gallery-item" />
            <img src="/me-photo-2.JPG" alt="Fotoğraf 2" className="photo-gallery-item" />
          </div>
        </section>

        <section className="section-about">
          <h2>Tech Stack</h2>
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
          <h2>İletişim</h2>
          <div className="contact-section">
            <p className="contact-intro">
              Benimle iletişime geçmek isterseniz aşağıdaki kanallardan
              ulaşabilirsiniz:
            </p>
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
                CV İndir
              </a>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  )
}

Me.Layout = Layout

