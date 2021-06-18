import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils';
import { BitcoinService } from './bitcoin.service';

export default (bitcoinService: BitcoinService) => ({
  async getOpReturnData(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    logger.debug(`GET /opreturn/:opReturnData : ${JSON.stringify(req.params)}`);
    const { opReturnData } = req.params;
    const result = await bitcoinService.getOpReturnData(opReturnData);
    logger.debug(
      `GET /opreturn/:opReturnData response: ${JSON.stringify(result)}`,
    );
    res.status(200).json(result);
    return next();
  },
});
