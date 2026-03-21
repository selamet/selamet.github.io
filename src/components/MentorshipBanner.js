import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Send, CheckCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const EMAILJS_SERVICE_ID = process.env.GATSBY_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = process.env.GATSBY_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = process.env.GATSBY_EMAILJS_PUBLIC_KEY

const BODY = '#1e1e2e'
const DARK = '#2a2a3e'

function CatAsymmetric() {
  return (
    <svg width="80" height="110" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ animation: 'cat-float 3.2s ease-in-out 0s infinite' }}>
      <g className="cat-q1">
        <text x="28" y="12" fontSize="13" fontWeight="bold" fill="#60a5fa" fontFamily="Georgia, serif">?</text>
      </g>
      <polygon points="10,44 18,20 30,42" fill={BODY} />
      <polygon points="14,42 18,26 27,42" fill="#f9a8d4" />
      <polygon points="50,42 62,20 70,44" fill={BODY} />
      <polygon points="53,42 62,26 66,42" fill="#f9a8d4" />
      <ellipse cx="40" cy="54" rx="28" ry="26" fill={BODY} />
      {/* big eye left */}
      <ellipse cx="29" cy="50" rx="7" ry="8" fill="white" />
      <ellipse cx="29" cy="51" rx="4" ry="5" fill="#111" />
      <circle cx="31" cy="48" r="1.5" fill="white" />
      {/* squint eye right */}
      <path d="M47 47 Q53 43 59 47" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M47 51 Q53 47 59 51" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
      <polygon points="40,57 37,62 43,62" fill="#f9a8d4" />
      {/* wavy confused mouth */}
      <path d="M34 65 Q37 62 40 65 Q43 68 46 65" stroke="#f9a8d4" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <line x1="2"  y1="55" x2="28" y2="59" stroke="#888" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
      <line x1="2"  y1="62" x2="28" y2="61" stroke="#888" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
      <line x1="52" y1="59" x2="78" y2="55" stroke="#888" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
      <line x1="52" y1="61" x2="78" y2="62" stroke="#888" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
      <ellipse cx="40" cy="98" rx="24" ry="20" fill={BODY} />
      <ellipse cx="40" cy="100" rx="14" ry="11" fill="#93c5fd" opacity="0.18" />
      <ellipse cx="24" cy="116" rx="10" ry="6" fill={BODY} />
      <ellipse cx="19" cy="117" rx="3" ry="2" fill={DARK} />
      <ellipse cx="24" cy="119" rx="3" ry="2" fill={DARK} />
      <ellipse cx="29" cy="117" rx="3" ry="2" fill={DARK} />
      <ellipse cx="56" cy="116" rx="10" ry="6" fill={BODY} />
      <ellipse cx="51" cy="117" rx="3" ry="2" fill={DARK} />
      <ellipse cx="56" cy="119" rx="3" ry="2" fill={DARK} />
      <ellipse cx="61" cy="117" rx="3" ry="2" fill={DARK} />
    </svg>
  )
}

function CatSurprised() {
  return (
    <svg width="92" height="122" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ animation: 'cat-float 3.2s ease-in-out 0.8s infinite' }}>
      <g className="cat-q2">
        <text x="14" y="11" fontSize="11" fontWeight="bold" fill="#fb923c" fontFamily="Georgia, serif">?</text>
        <text x="46" y="8"  fontSize="14" fontWeight="bold" fill="#fb923c" fontFamily="Georgia, serif">?</text>
      </g>
      <polygon points="10,44 18,18 32,42" fill={BODY} />
      <polygon points="14,42 18,24 28,42" fill="#fda4af" />
      <polygon points="48,42 62,18 70,44" fill={BODY} />
      <polygon points="52,42 62,24 67,42" fill="#fda4af" />
      <ellipse cx="40" cy="54" rx="30" ry="28" fill={BODY} />
      {/* wide surprised eyes */}
      <ellipse cx="28" cy="49" rx="8" ry="9" fill="white" />
      <ellipse cx="28" cy="50" rx="5" ry="6" fill="#111" />
      <circle cx="30" cy="47" r="2" fill="white" />
      <ellipse cx="52" cy="49" rx="8" ry="9" fill="white" />
      <ellipse cx="52" cy="50" rx="5" ry="6" fill="#111" />
      <circle cx="54" cy="47" r="2" fill="white" />
      {/* raised eyebrows */}
      <path d="M22 38 Q28 34 34 38" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M46 38 Q52 34 58 38" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
      <polygon points="40,57 37,62 43,62" fill="#fda4af" />
      {/* O mouth */}
      <ellipse cx="40" cy="67" rx="4" ry="3" fill="#fda4af" opacity="0.8" />
      <line x1="0"  y1="54" x2="28" y2="57" stroke="#888" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      <line x1="0"  y1="62" x2="28" y2="60" stroke="#888" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      <line x1="52" y1="57" x2="80" y2="54" stroke="#888" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      <line x1="52" y1="60" x2="80" y2="62" stroke="#888" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      <ellipse cx="40" cy="100" rx="26" ry="22" fill={BODY} />
      <ellipse cx="40" cy="102" rx="16" ry="13" fill="#fdba74" opacity="0.18" />
      <ellipse cx="22" cy="118" rx="11" ry="6" fill={BODY} />
      <ellipse cx="17" cy="119" rx="3" ry="2" fill={DARK} />
      <ellipse cx="22" cy="121" rx="3" ry="2" fill={DARK} />
      <ellipse cx="27" cy="119" rx="3" ry="2" fill={DARK} />
      <ellipse cx="58" cy="118" rx="11" ry="6" fill={BODY} />
      <ellipse cx="53" cy="119" rx="3" ry="2" fill={DARK} />
      <ellipse cx="58" cy="121" rx="3" ry="2" fill={DARK} />
      <ellipse cx="63" cy="119" rx="3" ry="2" fill={DARK} />
    </svg>
  )
}

function CatXEye() {
  return (
    <svg width="80" height="110" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ animation: 'cat-float 3.2s ease-in-out 1.5s infinite' }}>
      <g className="cat-q3">
        <text x="36" y="12" fontSize="13" fontWeight="bold" fill="#a78bfa" fontFamily="Georgia, serif">?</text>
      </g>
      <polygon points="10,44 18,20 30,42" fill={BODY} />
      <polygon points="14,42 18,26 27,42" fill="#c4b5fd" />
      <polygon points="50,42 62,20 70,44" fill={BODY} />
      <polygon points="53,42 62,26 66,42" fill="#c4b5fd" />
      <ellipse cx="40" cy="54" rx="28" ry="26" fill={BODY} />
      {/* X eye left */}
      <line x1="22" y1="44" x2="32" y2="54" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="32" y1="44" x2="22" y2="54" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      {/* normal right eye */}
      <ellipse cx="52" cy="49" rx="7" ry="7" fill="white" />
      <ellipse cx="52" cy="50" rx="4" ry="4.5" fill="#111" />
      <circle cx="54" cy="47" r="1.5" fill="white" />
      <polygon points="40,57 37,62 43,62" fill="#c4b5fd" />
      <path d="M35 65 Q40 68 45 65" stroke="#c4b5fd" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <line x1="2"  y1="55" x2="28" y2="59" stroke="#888" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
      <line x1="2"  y1="62" x2="28" y2="61" stroke="#888" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
      <line x1="52" y1="59" x2="78" y2="55" stroke="#888" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
      <line x1="52" y1="61" x2="78" y2="62" stroke="#888" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
      <ellipse cx="40" cy="98" rx="24" ry="20" fill={BODY} />
      <ellipse cx="40" cy="100" rx="14" ry="11" fill="#c4b5fd" opacity="0.18" />
      <ellipse cx="24" cy="116" rx="10" ry="6" fill={BODY} />
      <ellipse cx="19" cy="117" rx="3" ry="2" fill={DARK} />
      <ellipse cx="24" cy="119" rx="3" ry="2" fill={DARK} />
      <ellipse cx="29" cy="117" rx="3" ry="2" fill={DARK} />
      <ellipse cx="56" cy="116" rx="10" ry="6" fill={BODY} />
      <ellipse cx="51" cy="117" rx="3" ry="2" fill={DARK} />
      <ellipse cx="56" cy="119" rx="3" ry="2" fill={DARK} />
      <ellipse cx="61" cy="117" rx="3" ry="2" fill={DARK} />
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
          <CatAsymmetric />
          <CatSurprised />
          <CatXEye />
        </div>

        <div className="mentorship-content">
          <div className="mentorship-badge">
            {lang === 'tr' ? '🎓 Öğrencilere özel · Ücretsiz' : '🎓 For students · Free'}
          </div>
          <h2>
            {lang === 'tr'
              ? 'Kafalar karışık olabilir. Normal.'
              : 'Things can get confusing. That\'s okay.'}
          </h2>
          <p>
            {lang === 'tr'
              ? 'Nereden başlayacağını bilememek, takılı kalmak, sürekli bir şeylerin eksik hissettirmesi… Bunların hepsi sürecin parçası. Gel birlikte bakalım, işleri sadeleştirelim.'
              : 'Not knowing where to start, getting stuck, always feeling like something\'s missing… It\'s all part of the process. Let\'s look at it together and simplify things.'}
          </p>
          <p className="mentorship-lead">
            {lang === 'tr'
              ? 'Size ücretsiz mentörlük yapmak istiyorum.'
              : 'I\'d love to mentor you, for free.'}
          </p>
          <button className="button mentorship-cta" onClick={() => setOpen(true)}>
            {lang === 'tr' ? 'Hadi Başlayalım' : 'Let\'s Get Started'}
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
