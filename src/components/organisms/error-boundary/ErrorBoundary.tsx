import type { ErrorInfo } from 'react';
import type { ErrorBoundaryPropsWithFallback } from 'react-error-boundary';

import { DefaultError } from '../../molecules';
import { ErrorBoundary as DefaultErrorBoundary } from 'react-error-boundary';

type Properties = {
  readonly onReset?: () => void;
} & Omit<ErrorBoundaryPropsWithFallback, 'fallback'> & {
    fallback?: ErrorBoundaryPropsWithFallback['fallback'];
  };

const ErrorBoundary: React.FC<Properties> = ({
  fallback = undefined,
  onError,
  onReset = () => {},
  ...props
}) => {
  const onErrorReport = (error: unknown, info: ErrorInfo) => {
    // use any crash reporting tool here
    return onError?.(error, info);
  };

  return (
    <DefaultErrorBoundary
      {...props}
      fallback={fallback ?? <DefaultError onReset={onReset} />}
      onError={onErrorReport}
    />
  );
};

export default ErrorBoundary;
