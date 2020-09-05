import express from 'express';
import bodyParser from 'body-parser';

import { httpLogger } from './logger';

const app = express();

app.use(httpLogger());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;
