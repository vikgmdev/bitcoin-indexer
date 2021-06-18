import { Sequelize } from 'sequelize';
import OpReturn from './opreturn.model';
import { logger } from '../utils';

export interface Models {
  OpReturn: typeof OpReturn;
}

const models: Models = {
  OpReturn,
};

const createModels = (sequelize: Sequelize): Models => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  Object.values(models).forEach(async (model) => {
    try {
      await model.initialize(sequelize);
    } catch (error) {
      logger.error(error);
    }
  });

  return models;
};

export default createModels;
