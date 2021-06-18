import './utils/env';
import { config } from './config';
import { logger } from './utils';
import { app, store } from './app';
import { OpReturnIndexer } from './indexer';

app.listen({ port: config.app.port }, (): void => {
  logger.info(
    `🚀 ${config.app.name} up and running in ${config.app.env} @ http://localhost:${config.app.port}`,
  );

  setTimeout(() => {
    const opReturnIndexer = new OpReturnIndexer(store);
    const initialHeight = Number(process.env.INITIAL_HEIGHT);
    opReturnIndexer.start(initialHeight);
  }, 10000);
});
