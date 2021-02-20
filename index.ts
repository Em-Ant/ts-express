import 'reflect-metadata';

import { createConnection } from 'typeorm';

createConnection().then(async () => {
  try {
    import('./src');
  } catch (e) {
    console.log(e);
  }
});
