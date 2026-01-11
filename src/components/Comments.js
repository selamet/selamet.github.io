import React, { useEffect, useRef } from 'react'
import { useLocation } from '@reach/router'

export const Comments = () => {
  const commentsRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    // Get current theme
    const getTheme = () => {
      const currentTheme = window.localStorage.getItem('theme')
      if (currentTheme === 'light') {
        return 'light'
      } else if (currentTheme === 'dark') {
        return 'dark_dimmed'
      }
      return 'preferred_color_scheme'
    }

    // Wait for container to be available
    if (!commentsRef.current) {
      return
    }

    // Remove existing script and iframe if any
    const existingScript = document.getElementById('giscus-script')
    if (existingScript) {
      existingScript.remove()
    }

    // Remove existing iframe
    const existingIframe = commentsRef.current.querySelector('iframe.giscus-frame')
    if (existingIframe) {
      existingIframe.remove()
    }

    // Normalize pathname - remove leading and trailing slashes for consistent matching
    // Discussion title format: "posts/git-neden-kullanilmali/" (no leading slash)
    const normalizedPathname = location.pathname.replace(/^\/|\/$/g, '') || ''

    // Log for debugging
    console.log('Giscus pathname (normalized):', normalizedPathname)
    console.log('Giscus original pathname:', location.pathname)

    // Create and configure Giscus script
    const script = document.createElement('script')
    script.id = 'giscus-script'
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'selamet/selamet.github.io')
    script.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnkxNDcwMzU5NzQ=')
    script.setAttribute('data-category', 'General') // Discussion is in General category (not Comments)
    script.setAttribute('data-category-id', 'DIC_kwDOCMOXRs4C01O0') // General category ID - verify from giscus.app if needed
    script.setAttribute('data-mapping', 'pathname') // Match by pathname - discussion will be created with pathname as title
    script.setAttribute('data-strict', '0') // Allow creating new discussions if not found - this will create discussion with pathname as title
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', getTheme())
    script.setAttribute('data-lang', 'tr')
    script.setAttribute('data-loading', 'lazy')
    script.crossOrigin = 'anonymous'
    script.async = true

    // Error handling
    script.onerror = () => {
      console.error('Giscus script failed to load')
    }

    // Append script to comments container
    if (commentsRef.current) {
      // Clear container first
      commentsRef.current.innerHTML = ''
      commentsRef.current.appendChild(script)

      // Force Giscus to reload after script loads
      script.onload = () => {
        // Small delay to ensure Giscus is ready
        setTimeout(() => {
          const iframe = commentsRef.current.querySelector('iframe.giscus-frame')
          if (iframe && iframe.contentWindow) {
            // Force reload by sending update message
            iframe.contentWindow.postMessage(
              {
                giscus: {
                  resize: {
                    height: iframe.offsetHeight,
                  },
                },
              },
              'https://giscus.app'
            )
          }
        }, 500)
      }
    }

    // Theme change handler
    const handleThemeChange = () => {
      const iframe = document.querySelector('iframe.giscus-frame')
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          {
            giscus: {
              setConfig: {
                theme: getTheme(),
              },
            },
          },
          'https://giscus.app'
        )
      }
    }

    // Listen for theme changes
    window.addEventListener('themechange', handleThemeChange)

    // Listen for Giscus messages (for debugging)
    const handleMessage = (event) => {
      if (event.origin !== 'https://giscus.app') return

      if (event.data.giscus) {
        if (event.data.giscus.error) {
          console.error('Giscus error:', event.data.giscus.error)
        } else if (event.data.giscus.discussion) {
          console.log('Giscus discussion loaded:', event.data.giscus.discussion)
        }
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('themechange', handleThemeChange)
      window.removeEventListener('message', handleMessage)
      const scriptToRemove = document.getElementById('giscus-script')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [location.pathname]) // Re-run when pathname changes

  return <div ref={commentsRef} className="giscus" />
}

