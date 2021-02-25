import { NextFunction, Request, Response, Router } from 'express';

import tokenService, { auth } from '../auth';
import { PermissionLevel } from '../auth/Key';

const api = Router();

api.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

api.get('/token', async (req, res, next) => {
  const key = req.get('x-api-key');

  if (!key) throw { status: 401, message: 'no x-api-key header found' };
  try {
    const token = await tokenService.getToken(key);
    res.json(token);
  } catch ({ message }) {
    next({ status: 401, message });
  }
});

api.get('/protected', auth(), (req, res) => {
  res.json({
    user: req.context?.user,
  });
});

api.get('/admin', auth(PermissionLevel.ADMIN), (req, res) => {
  res.json({
    user: req.context?.user,
  });
});

interface HttpError {
  status?: number;
  message?: string;
}

api.use((err: HttpError, _: Request, res: Response, next: NextFunction) => {
  if (err) {
    return res
      .status(err.status ?? 500)
      .json({ message: err.message ?? 'unknown error' });
  }
  next();
});

export default api;
