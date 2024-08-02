import { Web3PluginBase } from "web3";
import type { HexStringBytes } from "web3-types";

import type * as _account from "./account";
import * as _rpc from "./rpc";
import type {
  Block,
  TxRequest,
  TryCallOutput,
  Address,
  BalanceOutput,
  BlockchainInfo,
  Hash,
  TxResponse,
  PastEvent,
  AttoTol,
  TransactionReceipt,
} from "./types";

export type TolarApi = _rpc.TolarRpcApi | _account.TolarAccount;

export class TolarPlugin extends Web3PluginBase<TolarApi> {
  public pluginNamespace = "tolar";

  public async getBlockCount(): Promise<number> {
    return _rpc.getBlockCount(this.requestManager);
  }

  public async getLatestBlock(): Promise<Block> {
    return _rpc.getLatestBlock(this.requestManager);
  }

  public async getBlockByHash(blockHash: Hash): Promise<Block> {
    return _rpc.getBlockByHash(this.requestManager, blockHash);
  }

  public async getBlockByIndex(blockIndex: number): Promise<Block> {
    return _rpc.getBlockByIndex(this.requestManager, blockIndex);
  }

  public async getGasEstimate(txRequest: TxRequest): Promise<AttoTol> {
    return _rpc.getGasEstimate(this.requestManager, txRequest);
  }

  public async tryCallTransaction(
    txRequest: TxRequest,
  ): Promise<TryCallOutput> {
    return _rpc.tryCallTransaction(this.requestManager, txRequest);
  }

  public async getBalance(
    address: Address,
    blockIndex: number,
  ): Promise<BalanceOutput> {
    return _rpc.getBalance(this.requestManager, address, blockIndex);
  }

  public async getLatestBalance(address: Address): Promise<BalanceOutput> {
    return _rpc.getLatestBalance(this.requestManager, address);
  }

  public async getNonce(address: Address): Promise<bigint> {
    return _rpc.getNonce(this.requestManager, address);
  }

  public async getBlockchainInfo(): Promise<BlockchainInfo> {
    return _rpc.getBlockchainInfo(this.requestManager);
  }

  public async getTransaction(transactionHash: Hash): Promise<TxResponse> {
    return _rpc.getTransaction(this.requestManager, transactionHash);
  }

  public async getTransactionList(
    addresses: Address[],
    limit: number,
    skip: number,
  ): Promise<TxResponse[]> {
    return _rpc.getTransactionList(this.requestManager, addresses, limit, skip);
  }

  public async getPastEvents(
    address: Address,
    topic: Hash,
  ): Promise<PastEvent[]> {
    return _rpc.getPastEvents(this.requestManager, address, topic);
  }

  public async getTransactionReceipt(
    transactionHash: Hash,
  ): Promise<TransactionReceipt> {
    return _rpc.getTransactionReceipt(this.requestManager, transactionHash);
  }

  public async getPeerCount(): Promise<number> {
    return _rpc.getPeerCount(this.requestManager);
  }

  public async getMasterNodeCount(): Promise<number> {
    return _rpc.getMasterNodeCount(this.requestManager);
  }

  public async isMasterNode(): Promise<number> {
    return _rpc.getMasterNodeCount(this.requestManager);
  }

  public async sendSignedTransaction(
    signedTransaction: HexStringBytes,
  ): Promise<Hash> {
    return _rpc.sendSignedTransaction(this.requestManager, signedTransaction);
  }
}

declare module "web3" {
  interface Web3Context {
    tolar: TolarPlugin;
  }
}
