import logger from './logger';
import httpLogger from './http';

const stream = {
  write: (msg: string): void => {
    logger.info(msg);
  },
};

export default logger;
export { stream, httpLogger };
