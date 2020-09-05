import morgan from 'morgan';
import { stream } from '.';

const httpLogger = (): ReturnType<typeof morgan> =>
  morgan(':method :url :status :res[content-length] - :response-time ms', {
    stream,
  });

export default httpLogger;
