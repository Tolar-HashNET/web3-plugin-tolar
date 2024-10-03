import type { HexString, Transaction, Web3Context } from "web3";
import { Web3PluginBase } from "web3";

import { initAccounts } from "./init_account";
import type { TolarExecutionAPI } from "./rpc";
import * as _rpc from "./rpc";
import type {
  RpcBlock,
  RpcTxRequest,
  RpcTryCallOutput,
  StrHexAddress,
  RpcBalanceOutput,
  RpcBlockchainInfo,
  StrHexHash,
  RpcTxResponse,
  RpcPastEvent,
  AttoTol,
  RpcTransactionReceipt,
} from "./types";

export class TolarPlugin extends Web3PluginBase<TolarExecutionAPI> {
  public pluginNamespace = "tolar";

  public constructor() {
    super();
  }

  public override link(parentContext: Web3Context): void {
    super.link(parentContext);

    const accounts = initAccounts(parentContext);
    this._wallet = accounts.wallet;
    this._accountProvider = accounts;
  }

  public async getBlockCount(): Promise<number> {
    return _rpc.getBlockCount(this.requestManager);
  }

  public async getLatestBlock(): Promise<RpcBlock> {
    return _rpc.getLatestBlock(this.requestManager);
  }

  public async getBlockByHash(blockHash: StrHexHash): Promise<RpcBlock> {
    return _rpc.getBlockByHash(this.requestManager, blockHash);
  }

  public async getBlockByIndex(blockIndex: number): Promise<RpcBlock> {
    return _rpc.getBlockByIndex(this.requestManager, blockIndex);
  }

  public async getGasEstimate(txRequest: RpcTxRequest): Promise<AttoTol> {
    return _rpc.getGasEstimate(this.requestManager, txRequest);
  }

  public async tryCallTransaction(
    txRequest: RpcTxRequest,
  ): Promise<RpcTryCallOutput> {
    return _rpc.tryCallTransaction(this.requestManager, txRequest);
  }

  public async getBalance(
    address: StrHexAddress,
    blockIndex: number,
  ): Promise<RpcBalanceOutput> {
    return _rpc.getBalance(this.requestManager, address, blockIndex);
  }

  public async getLatestBalance(
    address: StrHexAddress,
  ): Promise<RpcBalanceOutput> {
    return _rpc.getLatestBalance(this.requestManager, address);
  }

  public async getNonce(address: StrHexAddress): Promise<bigint> {
    return _rpc.getNonce(this.requestManager, address);
  }

  public async getBlockchainInfo(): Promise<RpcBlockchainInfo> {
    return _rpc.getBlockchainInfo(this.requestManager);
  }

  public async getTransaction(
    transactionHash: StrHexHash,
  ): Promise<RpcTxResponse> {
    return _rpc.getTransaction(this.requestManager, transactionHash);
  }

  public async getTransactionList(
    addresses: StrHexAddress[],
    limit: number,
    skip: number,
  ): Promise<RpcTxResponse[]> {
    return _rpc.getTransactionList(this.requestManager, addresses, limit, skip);
  }

  public async getPastEvents(
    address: StrHexAddress,
    topic: StrHexHash,
  ): Promise<RpcPastEvent[]> {
    return _rpc.getPastEvents(this.requestManager, address, topic);
  }

  public async getTransactionReceipt(
    transactionHash: StrHexHash,
  ): Promise<RpcTransactionReceipt> {
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
    signedTransaction: HexString,
  ): Promise<StrHexHash> {
    return _rpc.sendSignedTransaction(this.requestManager, signedTransaction);
  }

  public async sendTransaction(transaction: Transaction): Promise<StrHexHash> {
    if (this._wallet === undefined) {
      throw Error("Tolar wallet is not initialized");
    }

    if (transaction.from === undefined) {
      throw Error("Sender is missing from transaction");
    }

    const account = this._wallet.get(transaction.from);
    if (account === undefined) {
      throw Error(`Account is missing for sender: ${transaction.from}`);
    }

    const signTransaction = await account.signTransaction(transaction);
    return this.sendSignedTransaction(signTransaction.rawTransaction);
  }
}

declare module "web3" {
  interface Web3Context {
    tolar: TolarPlugin;
  }
}
