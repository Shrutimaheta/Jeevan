import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
    // Log error to console
    console.error('Uncaught error:', error, errorInfo);
    // TODO: Send error to external logging service if needed
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div 
          style={{ padding: 32, textAlign: 'center' }}
          role="alert"
          aria-live="assertive"
          aria-label="Error occurred"
        >
          <h2 id="error-title">Something went wrong.</h2>
          <p id="error-description">We're sorry for the inconvenience. Please try reloading the page.</p>
          <button 
            onClick={this.handleReload} 
            className='btn-primary btn-sm' 
            style={{ margin: '16px 0', padding: '8px 24px', fontSize: 16 }}
            aria-label="Reload the page to fix the error"
            aria-describedby="error-description"
          >
            Reload Page
          </button>
          <div style={{ marginTop: 16, color: '#888' }}>
            <p>If the problem persists, please contact support.</p>
          </div>
          <details style={{ marginTop: 24, textAlign: 'left', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
            <summary aria-describedby="error-details">Show error details</summary>
            <pre 
              id="error-details"
              style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }} 
              aria-label="Error details"
              aria-describedby="error-title"
            >
              {this.state.error && this.state.error.toString()}
              {'\n'}
              {this.state.errorInfo?.componentStack}
            </pre>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary; 