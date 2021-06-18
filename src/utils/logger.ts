import pino from 'pino';
import { config } from '../config';

const logger = pino({
  name: config.app.name,
  level: config.app.logLevel,
  prettyPrint: {
    translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
    colorize: true,
  },
});

export default logger;
