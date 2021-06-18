import express from 'express';
import { config } from './config';
import routes from './api/routes';
import createStore from './utils/store';
import { BitcoinService } from './api/bitcoin.service';
import BitcoinController from './api/bitcoin.controller';

const store = createStore(config.database);
const bitcoinService = new BitcoinService(store);
const bitcoinController = BitcoinController(bitcoinService);

const app = express();

app.use(express.json({ limit: config.app.requestLimit }));
app.use(
  express.urlencoded({
    extended: true,
    limit: config.app.requestLimit,
  }),
);

routes(app, bitcoinController);

export { app, store };
