import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';

import chatRouter from './routes/chat.js';
import eligibilityRouter from './routes/eligibility.js';
import journeyRouter from './routes/journey.js';
import timelineRouter from './routes/timeline.js';

const app = express();

// 1. CORS
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200
}));

// 2. JSON body parser
app.use(express.json({ limit: '10kb' }));

// 3. Global rate limiter — all routes
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please wait a moment before trying again.' }
});
app.use(globalLimiter);

// 4. Stricter rate limiter for AI chat only (cost protection)
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many questions in a short time. Please wait a moment.' }
});

// 5. Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'Election Assistant API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// 6. Mount routes
app.use('/api/chat', chatLimiter, chatRouter);
app.use('/api/eligibility', eligibilityRouter);
app.use('/api/journey', journeyRouter);
app.use('/api/timeline', timelineRouter);

// 7. 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    availableRoutes: [
      'GET  /api/health',
      'POST /api/chat                          — body: { query: string, language?: string }',
      'GET  /api/eligibility                   — query: ?topic=all|citizenship|age|residence|disqualification|documents|special_cases',
      'GET  /api/journey                       — all stages',
      'GET  /api/journey/:step                 — single stage (1-6)',
      'GET  /api/timeline                      — query: ?phase=all|1|2|3|4|5|6'
    ]
  });
});

// 8. Global error handler — MUST have exactly 4 params
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.path} — Error: ${err.message}`);

  if (err.message?.includes('Gemini API') || err.message?.includes('quota')) {
    return res.status(502).json({
      error: 'AI service temporarily unavailable',
      message: err.message,
      fallback: 'Please visit eci.gov.in or call the Voter Helpline at 1950 for election information.'
    });
  }

  if (err.status === 400) {
    return res.status(400).json({ error: err.message });
  }

  return res.status(500).json({
    error: 'Internal server error',
    message: err.message || 'An unexpected error occurred'
  });
});

// 9. Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Election Assistant API running on port ${PORT}`);
  console.log(`Health: http://localhost:${PORT}/api/health`);
});

export default app;
