import app from './src';
import config from './src/config';

const {
  server: { port },
} = config;

app.listen(port, () => console.log(`server started on port ${port}`));
