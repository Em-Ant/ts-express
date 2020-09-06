import express from 'express';

import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

import { httpLogger } from './logger';

import routes from './routes';

const app = express();

app.use(httpLogger());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());

app.use(routes);

export default app;
