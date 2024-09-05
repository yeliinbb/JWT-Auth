// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.css';
import Providers from './Providers.tsx';
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_APP_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration()
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: [
    'localhost',
    'https://moneyfulpublicpolicy.co.kr',
    'https://jsonplaceholder.typicode.com'
  ],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  environment: import.meta.env.MODE // development, production 등
});

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root')
);
