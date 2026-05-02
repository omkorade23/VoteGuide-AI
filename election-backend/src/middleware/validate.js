export function validateChatRequest(req, res, next) {
  // Check body exists
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ error: 'Request body is required' });
  }

  // Check query field exists
  if (req.body.query === undefined || req.body.query === null) {
    return res.status(400).json({ error: 'query field is required' });
  }

  // Check query is a string
  if (typeof req.body.query !== 'string') {
    return res.status(400).json({ error: 'query must be a string' });
  }

  const trimmed = req.body.query.trim();

  // Check not empty
  if (trimmed.length === 0) {
    return res.status(400).json({ error: 'query cannot be empty' });
  }

  // Check minimum length
  if (trimmed.length < 3) {
    return res.status(400).json({ error: 'query is too short. Please ask a complete question.' });
  }

  // Check maximum length
  if (trimmed.length > 500) {
    return res.status(400).json({
      error: 'query must be 500 characters or fewer',
      maxLength: 500,
      receivedLength: trimmed.length
    });
  }

  // Validate language if provided
  const validLanguages = ['english', 'hindi', 'tamil', 'marathi'];
  if (req.body.language !== undefined) {
    if (typeof req.body.language !== 'string') {
      return res.status(400).json({ error: 'language must be a string' });
    }
    const lang = req.body.language.toLowerCase().trim();
    if (!validLanguages.includes(lang)) {
      return res.status(400).json({
        error: 'language must be one of: english, hindi, tamil, marathi',
        validLanguages
      });
    }
    req.body.language = lang;
  } else {
    req.body.language = 'english';
  }

  // Sanitize: remove < > to prevent XSS in logs/responses
  req.body.query = trimmed.replace(/[<>]/g, '');

  next();
}

export function validateEligibilityRequest(req, res, next) {
  const validTopics = ['citizenship', 'age', 'residence', 'disqualification', 'documents', 'special_cases', 'all'];

  if (req.query.topic !== undefined) {
    if (!validTopics.includes(req.query.topic)) {
      return res.status(400).json({
        error: 'Invalid topic',
        validTopics
      });
    }
  } else {
    req.query.topic = 'all';
  }

  next();
}

export function validateTimelineRequest(req, res, next) {
  if (req.query.phase !== undefined) {
    const phaseNum = parseInt(req.query.phase, 10);
    if (isNaN(phaseNum) || phaseNum < 1 || phaseNum > 6) {
      return res.status(400).json({ error: 'phase must be a number between 1 and 6' });
    }
    req.query.phase = phaseNum.toString();
  } else {
    req.query.phase = 'all';
  }

  next();
}

export function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '').replace(/\s+/g, ' ');
}
