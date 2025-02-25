const Sentry = require('@sentry/nestjs');
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { config } from 'dotenv';

config();

Sentry.init({
  dsn: process.env.SENTRY_DSN || '',
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
});
Sentry.profiler.startProfiler();
Sentry.startSpan({ name: 'My First Transaction' }, () => {});
Sentry.profiler.stopProfiler();
