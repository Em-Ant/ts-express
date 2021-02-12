import { Router } from 'express';

import auth from '../auth';

const api = Router();

api.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

api.get('/token-test', async (req, res) => {
  const key = req.get('x-api-key');

  if (!key)
    return res.status(401).json({ message: 'no x-api-key header found' });
  try {
    const token = await auth.getToken(key);
    res.json(token);
  } catch ({ message }) {
    res.status(401).json({ message });
  }
});

export default api;
