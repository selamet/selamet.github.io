import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Send, CheckCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const EMAILJS_SERVICE_ID = process.env.GATSBY_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = process.env.GATSBY_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = process.env.GATSBY_EMAILJS_PUBLIC_KEY

const BODY = '#2d2d2d'
const EAR_INNER = '#e8a0b8'
const EYE_WHITE = '#ffffff'

function SvgCat({ expression = 'happy', bellyColor = '#3776AB', bellyLabel, delay = 0 }) {
  const eyes = {
    happy: (
      <g>
        <ellipse cx="36" cy="43" rx="7" ry="7" fill={EYE_WHITE} />
        <ellipse cx="36" cy="44" rx="3.5" ry="4" fill="#111" />
        <circle cx="38" cy="42" r="1.2" fill={EYE_WHITE} />
        <ellipse cx="64" cy="43" rx="7" ry="7" fill={EYE_WHITE} />
        <ellipse cx="64" cy="44" rx="3.5" ry="4" fill="#111" />
        <circle cx="66" cy="42" r="1.2" fill={EYE_WHITE} />
      </g>
    ),
    sleepy: (
      <g>
        <ellipse cx="36" cy="45" rx="7" ry="4" fill={EYE_WHITE} />
        <ellipse cx="36" cy="46" rx="3.5" ry="2.2" fill="#111" />
        <path d="M29 43 Q36 40 43 43" stroke={BODY} strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="64" cy="45" rx="7" ry="4" fill={EYE_WHITE} />
        <ellipse cx="64" cy="46" rx="3.5" ry="2.2" fill="#111" />
        <path d="M57 43 Q64 40 71 43" stroke={BODY} strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>
    ),
    curious: (
      <g>
        <ellipse cx="36" cy="43" rx="8" ry="8" fill={EYE_WHITE} />
        <ellipse cx="37" cy="44" rx="4" ry="4.5" fill="#111" />
        <circle cx="39" cy="41.5" r="1.4" fill={EYE_WHITE} />
        <ellipse cx="64" cy="43" rx="6" ry="7" fill={EYE_WHITE} />
        <ellipse cx="64" cy="44" rx="3" ry="4" fill="#111" />
        <circle cx="65.5" cy="41.5" r="1.2" fill={EYE_WHITE} />
      </g>
    ),
  }

  const mouth = {
    happy: <path d="M44 57 Q50 64 56 57" stroke={EAR_INNER} strokeWidth="2.2" fill="none" strokeLinecap="round" />,
    sleepy: <path d="M46 58 Q50 62 54 58" stroke={EAR_INNER} strokeWidth="2" fill="none" strokeLinecap="round" />,
    curious: <path d="M44 58 Q50 65 56 58" stroke={EAR_INNER} strokeWidth="2.5" fill="none" strokeLinecap="round" />,
  }

  return (
    <svg
      viewBox="0 0 100 138"
      width="88"
      height="110"
      style={{ animation: `cat-float 3.2s ease-in-out ${delay}s infinite` }}
    >
      {/* Ears */}
      <polygon points="16,42 26,12 42,40" fill={BODY} />
      <polygon points="20,40 26,18 38,40" fill={EAR_INNER} />
      <polygon points="58,40 74,12 84,42" fill={BODY} />
      <polygon points="62,40 74,18 80,40" fill={EAR_INNER} />

      {/* Head */}
      <ellipse cx="50" cy="54" rx="34" ry="32" fill={BODY} />

      {/* Eyes */}
      {eyes[expression]}

      {/* Nose */}
      <polygon points="50,55 47,60 53,60" fill={EAR_INNER} />

      {/* Mouth */}
      {mouth[expression]}

      {/* Whiskers */}
      <line x1="8"  y1="53" x2="38" y2="57" stroke="#888" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
      <line x1="8"  y1="60" x2="38" y2="59" stroke="#888" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
      <line x1="62" y1="57" x2="92" y2="53" stroke="#888" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
      <line x1="62" y1="59" x2="92" y2="60" stroke="#888" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />

      {/* Body */}
      <ellipse cx="50" cy="108" rx="30" ry="26" fill={BODY} />

      {/* Belly glow */}
      <ellipse cx="50" cy="110" rx="19" ry="17" fill={bellyColor} opacity="0.15" />
      <ellipse cx="50" cy="110" rx="14" ry="12" fill={bellyColor} opacity="0.25" />

      {/* Belly label */}
      <text
        x="50"
        y="114"
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
        fontFamily="monospace"
        fill={bellyColor}
        opacity="0.95"
      >
        {bellyLabel}
      </text>

      {/* Paws */}
      <ellipse cx="32" cy="130" rx="12" ry="7" fill={BODY} />
      <ellipse cx="68" cy="130" rx="12" ry="7" fill={BODY} />

      {/* Paw toes */}
      <ellipse cx="26" cy="131" rx="3.5" ry="2.2" fill="#3a3a3a" />
      <ellipse cx="32" cy="133" rx="3.5" ry="2.2" fill="#3a3a3a" />
      <ellipse cx="38" cy="131" rx="3.5" ry="2.2" fill="#3a3a3a" />
      <ellipse cx="62" cy="131" rx="3.5" ry="2.2" fill="#3a3a3a" />
      <ellipse cx="68" cy="133" rx="3.5" ry="2.2" fill="#3a3a3a" />
      <ellipse cx="74" cy="131" rx="3.5" ry="2.2" fill="#3a3a3a" />
    </svg>
  )
}

export function MentorshipBanner() {
  const { lang } = useLanguage()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitState, setSubmitState] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitState('sending')
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          project_idea: message,
          puzzle_title: 'Mentorship Application',
          puzzle_type: 'mentorship',
          solution_code: '',
          to_email: 'selametsamli@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      )
      setSubmitState('done')
    } catch {
      setSubmitState('error')
    }
  }

  return (
    <>
      <div className="mentorship-banner">
        <div className="mentorship-cats">
          <SvgCat expression="happy"   bellyColor="#3776AB" bellyLabel="Python" delay={0} />
          <SvgCat expression="sleepy"  bellyColor="#FF9900" bellyLabel="AWS"    delay={0.8} />
          <SvgCat expression="curious" bellyColor="#2496ED" bellyLabel="Docker" delay={1.5} />
        </div>

        <div className="mentorship-content">
          <div className="mentorship-badge">
            {lang === 'tr' ? '🎓 Ücretsiz' : '🎓 Free'}
          </div>
          <h2>
            {lang === 'tr'
              ? 'Öğrenci misin? Mentörlük yapalım.'
              : 'Are you a student? Let me mentor you.'}
          </h2>
          <p>
            {lang === 'tr'
              ? 'Backend, sistem tasarımı veya kariyer hakkında sorularınız mı var? Ücretsiz 1:1 mentörlük için başvurun.'
              : 'Questions about backend, system design, or your career? Apply for free 1:1 mentorship.'}
          </p>
          <button className="button mentorship-cta" onClick={() => setOpen(true)}>
            {lang === 'tr' ? 'Başvur' : 'Apply'}
          </button>
        </div>
      </div>

      {open && (
        <div className="puzzle-overlay" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div className="puzzle-modal mentorship-modal">
            <div className="puzzle-modal-header">
              <div>
                <span className="puzzle-type-badge">mentorship</span>
                <h2>{lang === 'tr' ? 'Mentörlük Başvurusu' : 'Mentorship Application'}</h2>
                <p className="puzzle-project-name">
                  {lang === 'tr' ? 'Ücretsiz · 1:1' : 'Free · 1:1'}
                </p>
              </div>
              <button className="puzzle-close" onClick={() => setOpen(false)}>✕</button>
            </div>

            <div className="puzzle-modal-body">
              {submitState !== 'done' ? (
                <form onSubmit={handleSubmit} className="puzzle-form">
                  <input
                    type="text"
                    placeholder={lang === 'tr' ? 'Adın' : 'Your name'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder={lang === 'tr' ? 'E-posta adresin' : 'Your email'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <textarea
                    placeholder={
                      lang === 'tr'
                        ? 'Nerede takıldın? Ne öğrenmek istiyorsun? Biraz anlat...'
                        : 'Where are you stuck? What do you want to learn? Tell me a bit...'
                    }
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    required
                  />
                  <button type="submit" className="button primary" disabled={submitState === 'sending'}>
                    <Send size={14} />
                    {submitState === 'sending'
                      ? (lang === 'tr' ? 'Gönderiliyor...' : 'Sending...')
                      : (lang === 'tr' ? 'Gönder' : 'Send')}
                  </button>
                  {submitState === 'error' && (
                    <p className="puzzle-submit-error">
                      {lang === 'tr' ? 'Bir hata oluştu. Tekrar dene.' : 'Something went wrong. Try again.'}
                    </p>
                  )}
                </form>
              ) : (
                <div className="puzzle-submitted">
                  <CheckCircle size={20} />
                  <div>
                    <strong>{lang === 'tr' ? 'Başvurun alındı!' : 'Application received!'}</strong>
                    <p>{lang === 'tr' ? `En kısa sürede ${email} adresine dönüyorum.` : `I'll get back to you at ${email} soon.`}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
