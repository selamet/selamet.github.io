import React, { createContext, useContext, useState, useEffect } from 'react'
import translations from '../utils/translations'

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('tr')

  useEffect(() => {
    const saved = window.localStorage.getItem('lang')
    if (saved === 'tr' || saved === 'en') {
      setLang(saved)
    } else {
      const browserLang = navigator.language || ''
      setLang(browserLang.toLowerCase().startsWith('tr') ? 'tr' : 'en')
    }
  }, [])

  const toggleLang = () => {
    const next = lang === 'tr' ? 'en' : 'tr'
    window.localStorage.setItem('lang', next)
    setLang(next)
  }

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[lang]
    for (const k of keys) {
      value = value?.[k]
    }
    return value ?? key
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
