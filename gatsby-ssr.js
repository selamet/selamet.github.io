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

