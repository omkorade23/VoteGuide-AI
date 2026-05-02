import { Router } from 'express';
import { askGemini } from '../services/gemini.js';
import { getContextForQuery } from '../services/router.js';
import { validateChatRequest } from '../middleware/validate.js';

const router = Router();

router.post('/', validateChatRequest, async (req, res, next) => {
  try {
    const { query, language } = req.body;

    // Get relevant data slice for this query
    const context = getContextForQuery(query, language);

    // Call Gemini with grounded context
    const result = await askGemini(query, context.data, context.topic, context.language);

    return res.status(200).json({
      success: true,
      answer: result.answer,
      topic: result.topic,
      language: result.language,
      meta: {
        dataItemsUsed: result.dataItemsUsed,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
