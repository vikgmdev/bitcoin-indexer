import { Models } from './models';
import BitcoinClient from './clients/bitcoin-client';
import { config } from './config';
import { logger } from './utils';

export class OpReturnIndexer {
  bitcoinClient: BitcoinClient;

  store: Models;

  constructor(store: Models) {
    this.bitcoinClient = new BitcoinClient(
      config.app.bitcoinAPI,
      config.app.bitcoinUser,
      config.app.bitcoinPass,
    );
    this.store = store;
  }

  async start(initialHeight?: number) {
    logger.info('OP_RETURN Indexer has started...');
    if (!initialHeight) {
      const { blocks } = await this.bitcoinClient.getBlockchainInfo();
      initialHeight = blocks;
    }

    const blockIndexed = await this.startIndexer(initialHeight);
    if (!blockIndexed) logger.error(`Failed to index block ${initialHeight}`);

    this.start(initialHeight + 1);
  }

  private async startIndexer(initialHeight: number) {
    logger.debug(`Getting block ${initialHeight}`);
    const opReturnsIndexed = await this.getOpReturnsByBlock(initialHeight);

    if (opReturnsIndexed.length === 0) {
      logger.debug(
        `Block ${initialHeight} does not contained any OP_RETURN transaction.`,
      );
      return true;
    }

    const storePromises = opReturnsIndexed.map((opReturn) => {
      logger.debug(
        `New OP_RETURNS is going to be indexed: ${JSON.stringify(opReturn)}`,
      );
      return this.store.OpReturn.create(opReturn);
    });
    await Promise.all(storePromises);
    logger.info(`New ${storePromises.length} OP_RETURNS has been indexed.`);
    return true;
  }

  private async getOpReturnsByBlock(height: number) {
    try {
      const blockHash = await this.bitcoinClient.getBlockHash(height);

      const { tx, height: blockHeight } = await this.bitcoinClient.getBlock(
        blockHash,
      );

      const rawTransactions = await this.bitcoinClient.getRawTransactions(
        tx,
        blockHash,
      );

      const txs = rawTransactions
        .map(({ vout, txid }) =>
          this.getOpReturnsFromTx(vout, txid, blockHeight, blockHash),
        )
        .filter((txsArray) => txsArray.length > 0)
        .flat();

      return txs;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  private getOpReturnsFromTx(
    vout: any[],
    txid: string,
    blockHeight: number,
    blockHash: string,
  ) {
    const opReturnTXs = vout
      .filter(({ scriptPubKey: { asm } }) => asm.includes('OP_RETURN'))
      .map(({ scriptPubKey: { asm } }) => {
        const [, opReturn] = asm.split(' ');
        const decodedOpReturn = Buffer.from(opReturn, 'hex').toString();

        return {
          opReturn,
          decodedOpReturn,
          txid,
          blockHeight,
          blockHash,
        };
      });
    return opReturnTXs;
  }
}
