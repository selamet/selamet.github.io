import React, { useState } from 'react'
import Helmet from 'react-helmet'
import { Code2, Palette } from 'lucide-react'

import { Layout } from '../components/Layout'
import { SEO } from '../components/SEO'
import { Hero } from '../components/Hero'
import { PageLayout } from '../components/PageLayout'
import { PuzzleChallenge } from '../components/PuzzleChallenge'
import config from '../utils/config'
import { useLanguage } from '../context/LanguageContext'

const challenges = [
  {
    id: 'backend',
    type: 'backend',
    accent: '#5a9e6f',
    icon: Code2,
    title: { tr: 'Backend Challenge', en: 'Backend Challenge' },
    desc: {
      tr: 'Algoritma ve veri yapısı. Kodunu çalıştır, testleri geç.',
      en: 'Algorithm & data structures. Write your solution and pass the tests.',
    },
    puzzle: {
      type: 'backend',
      title: 'Weighted Random Selection',
      description: `Given an array of participants with ticket counts, return one winner's name at random — each ticket has an equal chance of being drawn.

Example: Alice has 3 tickets, Bob has 1. Alice should win ~75% of the time.`,
      starterCode: `function pickWinner(participants) {
  // participants: [{ name: 'Alice', tickets: 3 }, { name: 'Bob', tickets: 1 }]
  // Return the winner's name
}`,
      testCases: [
        {
          description: 'Returns a string',
          run: (fn) => {
            const result = fn([{ name: 'Alice', tickets: 3 }, { name: 'Bob', tickets: 1 }])
            if (typeof result !== 'string') throw new Error(`Expected string, got ${typeof result}`)
          },
        },
        {
          description: 'Winner must be one of the participants',
          run: (fn) => {
            const participants = [{ name: 'Alice', tickets: 1 }, { name: 'Bob', tickets: 1 }]
            const result = fn(participants)
            if (!['Alice', 'Bob'].includes(result)) throw new Error(`Unknown winner: "${result}"`)
          },
        },
        {
          description: 'Works with a single participant',
          run: (fn) => {
            const result = fn([{ name: 'Solo', tickets: 5 }])
            if (result !== 'Solo') throw new Error(`Expected "Solo", got "${result}"`)
          },
        },
        {
          description: 'Ticket weights are respected (statistical)',
          run: (fn) => {
            const counts = {}
            for (let i = 0; i < 1000; i++) {
              const w = fn([{ name: 'Alice', tickets: 9 }, { name: 'Bob', tickets: 1 }])
              counts[w] = (counts[w] || 0) + 1
            }
            if ((counts.Alice || 0) < 700) throw new Error(`Alice should win ~90% — got ${counts.Alice || 0}/1000`)
          },
        },
      ],
    },
  },
  {
    id: 'frontend',
    type: 'frontend',
    accent: '#5b8abf',
    icon: Palette,
    title: { tr: 'Frontend Challenge', en: 'Frontend Challenge' },
    desc: {
      tr: 'HTML ve CSS. Önizlemeni göster, sonra gönder.',
      en: 'HTML & CSS. Build it, preview it, then send.',
    },
    puzzle: {
      type: 'frontend',
      title: 'CSS Toggle Switch',
      description: `Build a CSS-only toggle switch — no JavaScript allowed.

Requirements:
- Smooth slide animation when toggled
- Changes background color when checked
- Works using only HTML + CSS (the checkbox trick)`,
      starterCode: `<style>
  body { display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f5f5f5; }

  /* your styles here */
</style>

<label class="toggle">
  <input type="checkbox" />
  <span class="slider"></span>
</label>`,
    },
  },
]

export default function Collaborate() {
  const { lang } = useLanguage()
  const [activeChallenge, setActiveChallenge] = useState(null)

  return (
    <>
      <Helmet title={`Collaborate | ${config.siteTitle}`} />
      <SEO pagePath="/collaborate" />

      <PageLayout>
        <Hero
          title={lang === 'tr' ? 'Birlikte Geliştirelim' : "Let's Build Together"}
          description={
            lang === 'tr'
              ? 'Birlikte açık kaynak bir şey geliştirmek ister misin? Alanına göre bir bulmaca çöz, ne yapmak istediğini yaz — seninle iletişime geçeyim.'
              : "Want to build something open source together? Solve a quick challenge in your area, tell me what you have in mind, and I'll get back to you."
          }
        />

        <div className="collaborate-grid">
          {challenges.map((ch) => {
            const Icon = ch.icon
            return (
              <div
                className="collaborate-card"
                key={ch.id}
                style={{ '--project-accent': ch.accent }}
              >
                <div className="collaborate-card-top">
                  <div className="collaborate-card-badge">
                    <Icon size={13} />
                    {ch.title[lang] || ch.title.en}
                  </div>
                  <p className="collaborate-card-tagline">{ch.desc[lang] || ch.desc.en}</p>
                </div>

                <div className="collaborate-card-puzzle">
                  <p className="collaborate-puzzle-desc">
                    {ch.puzzle.description.split('\n')[0]}
                  </p>
                </div>

                <button
                  className="button primary collaborate-start-btn"
                  onClick={() => setActiveChallenge(ch)}
                >
                  {lang === 'tr' ? 'Başla' : 'Start Challenge'}
                </button>
              </div>
            )
          })}
        </div>
      </PageLayout>

      {activeChallenge && (
        <PuzzleChallenge
          project={{ name: activeChallenge.title[lang], slug: activeChallenge.id, puzzle: activeChallenge.puzzle }}
          onClose={() => setActiveChallenge(null)}
          lang={lang}
        />
      )}
    </>
  )
}

Collaborate.Layout = Layout
