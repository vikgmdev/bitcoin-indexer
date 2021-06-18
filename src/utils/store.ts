import { Sequelize } from 'sequelize';
import logger from './logger';
import createModels, { Models } from '../models';
import { DatabaseConfig } from '../config/database';

const createStore = (options: DatabaseConfig): Models => {
  const connectionURI = `postgres://${options.pgUser}:${options.pgPassword}@${options.pgHost}:${options.pgPort}/${options.pgDB}`;

  const sequelize = new Sequelize(connectionURI, {
    logging: false,
  });

  sequelize
    .sync({ alter: true })
    .then((): void => {
      logger.info('Database connection has been established successfully.');
    })
    .catch((err: object): void => {
      logger.error('Unable to connect to database:', err);
    });

  return createModels(sequelize);
};

export default createStore;
