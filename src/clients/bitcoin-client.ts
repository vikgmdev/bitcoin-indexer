import btoa from 'btoa';
import Utils from '../utils';

export default class BitcoinClient {
  private baseUrl: string;

  private rpcUser: string;

  private rpcPassword: string;

  constructor(baseUrl: string, rpcUser: string, rpcPassword: string) {
    this.baseUrl = baseUrl;
    this.rpcUser = rpcUser;
    this.rpcPassword = rpcPassword;
  }

  private callRPC = async <T>(method: string, parameters = []): Promise<T> => {
    const rpcRequest = Utils.generateRPCRequest(method, parameters);
    try {
      const auth = btoa(`${this.rpcUser}:${this.rpcPassword}`);
      const { error, result } = await Utils.fetchJSON<{
        result: T;
        error: unknown;
      }>(this.baseUrl, {
        ...rpcRequest,
        headers: { Authorization: `Basic ${auth}` },
      });
      if (error) throw error;
      return result;
    } catch (error) {
      if (error.status === 401) {
        throw new Error('Verify username and password');
      }
      throw error;
    }
  };

  private batchCallRPC = async (
    commands: {
      method: string;
      parameters: unknown[];
      id?: string;
    }[],
  ): Promise<any[]> => {
    try {
      const body = JSON.stringify(
        commands.map((command) => ({
          jsonrpc: '1.0',
          params: command.parameters || [],
          ...command,
        })),
      );
      const auth = btoa(`${this.rpcUser}:${this.rpcPassword}`);
      const response = await Utils.fetchJSON<any[]>(this.baseUrl, {
        method: 'POST',
        headers: { Authorization: `Basic ${auth}` },
        body,
      });
      const errors = response
        .filter(({ error }) => !!error)
        .map(({ error }) => error);
      if (errors.length > 0) {
        throw errors;
      }
      return response.map(({ result }) => result);
    } catch (error) {
      if (error.status === 401) {
        throw new Error();
      }
      throw error;
    }
  };

  getRawTransactions = async (
    txids: string[],
    blockHash?: string,
  ): Promise<any[]> => {
    const txBatch = txids.map((txid: string) => ({
      method: 'getrawtransaction',
      parameters: [txid, true, blockHash],
      id: txid,
    }));
    return this.batchCallRPC(txBatch);
  };

  getBlockchainInfo = (): Promise<{ blocks: number }> =>
    this.callRPC('getblockchaininfo');

  getBlock = (blockHash: string): Promise<{ tx: string[]; height: number }> =>
    this.callRPC('getblock', [blockHash]);

  getBlockHash = (height: number): Promise<string> =>
    this.callRPC('getblockhash', [height]);
}
