import { Router } from 'express';

import tokenService, { auth } from '../auth';

const api = Router();

api.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

api.get('/token', async (req, res) => {
  const key = req.get('x-api-key');

  if (!key)
    return res.status(401).json({ message: 'no x-api-key header found' });
  try {
    const token = await tokenService.getToken(key);
    res.json(token);
  } catch ({ message }) {
    res.status(401).json({ message });
  }
});

api.get('/protected', auth(), (req, res) => {
  res.json({
    user: req.context?.user,
  });
});

api.get('/admin', auth(2), (req, res) => {
  res.json({
    user: req.context?.user,
  });
});

export default api;
