import { Router } from 'express';
import { validateEligibilityRequest } from '../middleware/validate.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const eligibilityData = JSON.parse(
  readFileSync(join(__dirname, '..', 'data', 'eligibility.json'), 'utf-8')
);

const router = Router();

router.get('/', validateEligibilityRequest, (req, res) => {
  const { topic } = req.query;

  let result;
  if (topic === 'all') {
    result = eligibilityData;
  } else {
    result = eligibilityData.filter(item => item.category === topic);
    if (result.length === 0) {
      result = eligibilityData;
    }
  }

  return res.status(200).json({
    success: true,
    topic,
    count: result.length,
    data: result,
    meta: {
      timestamp: new Date().toISOString(),
      source: 'Election Commission of India'
    }
  });
});

export default router;
