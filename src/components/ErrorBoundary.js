import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '2rem',
            textAlign: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Bir şeyler ters gitti
          </h1>
          <p style={{ marginBottom: '2rem', color: '#666' }}>
            Üzgünüz, beklenmeyen bir hata oluştu. Lütfen sayfayı yenileyin.
          </p>
          <button
            onClick={this.handleReload}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Sayfayı Yenile
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

