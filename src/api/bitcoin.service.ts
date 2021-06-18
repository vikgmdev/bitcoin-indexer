import { Models } from '../models';
import OpReturn from '../models/opreturn.model';

export class BitcoinService {
  store: Models;

  constructor(store: Models) {
    this.store = store;
  }

  async getOpReturnData(opReturnData: string): Promise<OpReturn[]> {
    const data = await this.store.OpReturn.findAll({
      where: { opReturn: opReturnData },
      raw: true,
    });
    return data;
  }
}
