import React from 'react'
import ErrorBoundary from './src/components/ErrorBoundary'

export function wrapPageElement({ element, props }) {
  const Layout = element.type.Layout ?? React.Fragment

  return (
    <ErrorBoundary>
      <Layout {...props}>{element}</Layout>
    </ErrorBoundary>
  )
}

// Google Analytics - UTM parametrelerini ve sayfa görüntülemelerini takip et
export const onRouteUpdate = ({ location, prevLocation }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    // UTM parametrelerini al
    const urlParams = new URLSearchParams(location.search)
    const utmSource = urlParams.get('utm_source')
    const utmMedium = urlParams.get('utm_medium')
    const utmCampaign = urlParams.get('utm_campaign')
    const utmContent = urlParams.get('utm_content')

    // Sayfa görüntüleme event'i gönder
    window.gtag('config', 'G-PJVYMQ9JVJ', {
      page_path: location.pathname + location.search,
      page_title: document.title,
    })

    // UTM parametreleri varsa custom event gönder
    if (utmSource || utmMedium || utmCampaign) {
      window.gtag('event', 'page_view_with_utm', {
        page_path: location.pathname,
        page_title: document.title,
        utm_source: utmSource || 'direct',
        utm_medium: utmMedium || 'none',
        utm_campaign: utmCampaign || 'none',
        utm_content: utmContent || 'none',
      })
    }
  }
}