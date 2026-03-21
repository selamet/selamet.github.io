import React, { useState } from 'react'

function PythonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <path d="M11.9 2C9.3 2 7.5 3.1 7.5 4.5V6h4.5v.5H5.5C4 6.5 2.5 7.8 2.5 10.5s1.5 4 3 4H7v-2c0-1.5 1.3-2.5 3-2.5h4c1.3 0 2-.7 2-2V4.5C16 3.1 14.5 2 11.9 2zm-1.4 1.5a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z" fill="#3776AB"/>
      <path d="M12.1 22c2.6 0 4.4-1.1 4.4-2.5V18h-4.5v-.5h6.5c1.5 0 3-1.3 3-4s-1.5-4-3-4H17v2c0 1.5-1.3 2.5-3 2.5H10c-1.3 0-2 .7-2 2v3.5C8 20.9 9.5 22 12.1 22zm1.4-1.5a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z" fill="#FFD43B"/>
    </svg>
  )
}

function AwsIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M6.8 10.4c0 .4.1.7.2 1 .1.2.3.4.5.6.2.1.2.3.1.5l-.4.3c-.3.2-.5.1-.7-.1a3.8 3.8 0 0 1-.9-2.4c0-.9.3-1.7.9-2.4.2-.2.4-.3.7-.1l.4.3c.1.2.1.4-.1.5a2 2 0 0 0-.5.6c-.1.3-.2.7-.2 1.2zm10.4 0c0-.5-.1-.9-.2-1.2a2 2 0 0 0-.5-.6c-.2-.1-.2-.3-.1-.5l.4-.3c.3-.2.5-.1.7.1.6.7.9 1.5.9 2.4 0 .9-.3 1.8-.9 2.4-.2.2-.4.3-.7.1l-.4-.3c-.1-.2-.1-.4.1-.5.2-.2.4-.4.5-.6.1-.3.2-.6.2-1z" fill="#FF9900"/>
      <path d="M9.2 8.8a2.8 2.8 0 1 1 5.6 0 2.8 2.8 0 0 1-5.6 0zm1.3 5.7H8.4l-1.2 3.5h1.2l.3-.9h1.4l.3.9h1.2l-1.1-3.5zm-.8 2.2.4-1.3.4 1.3H9.7zm4.4-2.2h-1.3l1.3 3.5h1l1.3-3.5h-1.3l-.5 1.9-.5-1.9z" fill="#FF9900"/>
    </svg>
  )
}

function DockerIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
      <path d="M13.1 5.4h-2v1.7h2V5.4zm0 2h-2v1.7h2V7.4zm-2.2 0H8.8v1.7h2.1V7.4zm0-2H8.8v1.7h2.1V5.4zm-2.2 2H6.7v1.7h2V7.4zm2.2 2H8.8v1.7h2.1V9.4zm2.2 0h-2v1.7h2V9.4zm2.1 0h-2v1.7h2V9.4zm0-2h-2v1.7h2V7.4z" fill="#2496ED"/>
      <path d="M21.8 10.5a3 3 0 0 0-2-.5c-.3-1-.9-1.8-1.8-2.4l-.4-.2-.2.4a3.5 3.5 0 0 0-.4 1.7c0 .5.1 1 .4 1.5-.4.2-.8.3-1.2.3H2.2a4 4 0 0 0 .4 2.5 5 5 0 0 0 1.8 2 6 6 0 0 0 2.9.7c.7 0 1.3-.1 2-.3a6 6 0 0 0 1.7-.9 5.3 5.3 0 0 0 2.2-3h.2c1.3 0 2.2-.6 2.7-1.6.3 0 .7.1 1 .2l.4.2.1-.5z" fill="#2496ED"/>
    </svg>
  )
}
import emailjs from '@emailjs/browser'
import { Send, CheckCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const EMAILJS_SERVICE_ID = process.env.GATSBY_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = process.env.GATSBY_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = process.env.GATSBY_EMAILJS_PUBLIC_KEY

function CssCat({ mood = 'happy', belly }) {
  return (
    <div className={`css-cat css-cat--${mood}`}>
      <div className="cat-ear cat-ear--left" />
      <div className="cat-ear cat-ear--right" />
      <div className="cat-head">
        <div className="cat-face">
          <div className="cat-eyes">
            <div className="cat-eye cat-eye--left">
              <div className="cat-pupil" />
            </div>
            <div className="cat-eye cat-eye--right">
              <div className="cat-pupil" />
            </div>
          </div>
          <div className="cat-nose" />
          <div className="cat-mouth" />
          <div className="cat-whiskers">
            <div className="cat-whisker cat-whisker--l1" />
            <div className="cat-whisker cat-whisker--l2" />
            <div className="cat-whisker cat-whisker--r1" />
            <div className="cat-whisker cat-whisker--r2" />
          </div>
        </div>
      </div>
      <div className="cat-body">
        {belly && <div className="cat-belly-icon">{belly}</div>}
        <div className="cat-paws">
          <div className="cat-paw cat-paw--left" />
          <div className="cat-paw cat-paw--right" />
        </div>
      </div>
    </div>
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
          <CssCat mood="happy"   belly={<PythonIcon />} />
          <CssCat mood="sleepy"  belly={<AwsIcon />} />
          <CssCat mood="curious" belly={<DockerIcon />} />
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
              ? 'Backend, sistem tasarımı veya kariyer hakkında sorularınız mı var? Ücretsiz 1:1 mentörlük için başvurun — kediler de sizi bekliyor.'
              : "Questions about backend, system design, or your career? Apply for free 1:1 mentorship — the cats are waiting for you too."}
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
                        : "Where are you stuck? What do you want to learn? Tell me a bit..."
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
