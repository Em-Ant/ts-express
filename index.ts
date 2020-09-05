import app from './src';
import config from './src/config';
import log from './src/logger';

const {
  server: { port },
} = config;

app.listen(port, () => log.info(`server started on port ${port}`));
