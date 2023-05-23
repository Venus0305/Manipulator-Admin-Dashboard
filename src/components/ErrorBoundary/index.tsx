/* eslint-disable class-methods-use-this */
import NotFoundPage from 'containers/NotFoundPage';
import { PureComponent } from 'react';

interface ErrorBoundaryProps {
  children: JSX.Element | null;
}

interface State {
  hasError: boolean;
  error: Error;
}

class ErrorBoundary extends PureComponent<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: {
        name: '',
        message: '',
      },
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error): void {
    // You can also log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error('errr', error);
  }

  render(): React.ReactNode {
    const { hasError, error } = this.state;
    const { children } = this.props;
    if (hasError && error) {
      return <NotFoundPage />;
    }
    return children;
  }
}
export default ErrorBoundary;
