import winston, { format } from 'winston';
import config from '../config';

const { combine, colorize, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] ${message}`;
});

const logger = winston.createLogger({
  level: config.logger.level,
  format: combine(colorize(), timestamp(), myFormat),
  transports: [new winston.transports.Console()],
});

export default logger;
