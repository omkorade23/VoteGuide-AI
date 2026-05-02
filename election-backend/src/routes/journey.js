import { Router } from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const journeyData = JSON.parse(
  readFileSync(join(__dirname, '..', 'data', 'journey.json'), 'utf-8')
);

const router = Router();

router.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    count: journeyData.length,
    data: journeyData,
    meta: {
      timestamp: new Date().toISOString(),
      source: 'Election Commission of India'
    }
  });
});

router.get('/:step', (req, res) => {
  const stepNumber = parseInt(req.params.step, 10);

  if (isNaN(stepNumber) || stepNumber < 1 || stepNumber > 6) {
    return res.status(400).json({ error: 'Step must be a number between 1 and 6' });
  }

  const stage = journeyData.find(item => item.step_number === stepNumber);

  if (!stage) {
    return res.status(404).json({ error: `Step ${stepNumber} not found` });
  }

  return res.status(200).json({
    success: true,
    data: stage,
    meta: { timestamp: new Date().toISOString() }
  });
});

export default router;
