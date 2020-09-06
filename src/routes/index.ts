import { Router } from 'express';

const api = Router();

api.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

export default api;
