import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import { Send, CheckCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const EMAILJS_SERVICE_ID = process.env.GATSBY_EMAILJS_SERVICE_ID
const EMAILJS_TEMPLATE_ID = process.env.GATSBY_EMAILJS_TEMPLATE_ID
const EMAILJS_PUBLIC_KEY = process.env.GATSBY_EMAILJS_PUBLIC_KEY

function CssCat({ mood = 'happy' }) {
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
        <div className="cat-paws">
          <div className="cat-paw cat-paw--left" />
          <div className="cat-paw cat-paw--right" />
        </div>
      </div>
      <div className="cat-tail" />
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
          <CssCat mood="happy" />
          <CssCat mood="sleepy" />
          <CssCat mood="curious" />
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
