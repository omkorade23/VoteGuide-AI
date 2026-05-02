import { Router } from 'express';
import { validateTimelineRequest } from '../middleware/validate.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const timelineData = JSON.parse(
  readFileSync(join(__dirname, '..', 'data', 'timeline.json'), 'utf-8')
);

const router = Router();

router.get('/', validateTimelineRequest, (req, res) => {
  const { phase } = req.query;

  let result;
  if (phase === 'all') {
    result = timelineData;
  } else {
    const phaseNumber = parseInt(phase, 10);
    result = timelineData.filter(item => item.phase_number === phaseNumber);
    if (result.length === 0) {
      return res.status(404).json({ error: `Phase ${phase} not found` });
    }
  }

  return res.status(200).json({
    success: true,
    count: result.length,
    data: result,
    meta: {
      timestamp: new Date().toISOString(),
      source: 'Election Commission of India',
      note: 'Timeline shows general election process phases. Actual dates depend on ECI schedule announcement.'
    }
  });
});

export default router;
