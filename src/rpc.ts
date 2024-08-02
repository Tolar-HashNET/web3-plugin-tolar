import type { Web3RequestManager } from "web3-core";
import type { HexString, HexStringBytes } from "web3-types";

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
  NetworkId,
  TransactionReceipt,
  LogEntry,
} from "./types";

export interface TolarRpcApi {
  getBlockCount: () => number;
  getLatestBlock: () => Block;
  getBlockByHash: (blockHash: Hash) => Block;
  getBlockByIndex: (blockIndex: number) => Block;
  getGasEstimate: (txRequest: TxRequest) => AttoTol;
  tryCallTransaction: (txRequest: TxRequest) => TryCallOutput;
  getBalance: (address: Address, blockIndex: number) => BalanceOutput;
  getLatestBalance: (address: Address) => BalanceOutput;
  getNonce: (address: Address) => bigint;
  getBlockchainInfo: () => BlockchainInfo;
  getTransaction: (transactionHash: Hash) => TxResponse;
  getTransactionList: (
    transactionHashes: Hash[],
    limit: number,
    skip: number,
  ) => TxResponse[];
  getPastEvents: (address: Address, topic: Hash) => PastEvent[];
  getTransactionReceipt: (transactionHash: Hash) => TransactionReceipt;
  getPeerCount: () => number;
  getMasterNodeCount: () => number;
  isMasterNode: () => boolean;
  sendSignedTransaction: (signedTransaction: HexStringBytes) => Hash;
}

export async function getBlockCount(
  requestManager: Web3RequestManager<TolarRpcApi>,
): Promise<number> {
  return requestManager.send({
    method: "tol_getBlockCount",
    params: [],
  });
}

function toBlock(rawBlock: Map<string, unknown>): Block {
  return {
    blockIndex: rawBlock.get("block_index") as number,
    blockHash: rawBlock.get("block_hash") as Hash,
    confirmationTimestamp: new Date(
      rawBlock.get("confirmation_timestamp") as number,
    ),
    previousBlockHash: rawBlock.get("previous_block_hash") as Hash,
    transactionHashes: rawBlock.get("transaction_hashes") as Hash[],
  };
}

export async function getLatestBlock(
  requestManager: Web3RequestManager<TolarRpcApi>,
): Promise<Block> {
  return toBlock(
    await requestManager.send({
      method: "tol_getLatestBlock",
      params: [],
    }),
  );
}

export async function getBlockByHash(
  requestManager: Web3RequestManager<TolarRpcApi>,
  blockHash: Hash,
): Promise<Block> {
  return toBlock(
    await requestManager.send({
      method: "tol_getBlockByHash",
      params: [blockHash],
    }),
  );
}

export async function getBlockByIndex(
  requestManager: Web3RequestManager<TolarRpcApi>,
  blockIndex: number,
): Promise<Block> {
  return toBlock(
    await requestManager.send({
      method: "tol_getBlockByIndex",
      params: [blockIndex],
    }),
  );
}

export async function getGasEstimate(
  requestManager: Web3RequestManager<TolarRpcApi>,
  txRequest: TxRequest,
): Promise<AttoTol> {
  return requestManager.send({
    method: "tol_getGasEstimate",
    params: Object.values(txRequest),
  });
}

export async function tryCallTransaction(
  requestManager: Web3RequestManager<TolarRpcApi>,
  txRequest: TxRequest,
): Promise<TryCallOutput> {
  return requestManager.send({
    method: "tol_tryCallTransaction",
    params: Object.values(txRequest),
  });
}

function toBalanceOutput(rawBalance: Map<string, unknown>): BalanceOutput {
  return {
    balance: BigInt(rawBalance.get("balance") as string),
    blockIndex: rawBalance.get("block_index") as number,
  };
}

export async function getBalance(
  requestManager: Web3RequestManager<TolarRpcApi>,
  address: Address,
  blockIndex: number,
): Promise<BalanceOutput> {
  return toBalanceOutput(
    await requestManager.send({
      method: "tol_getBalance",
      params: [address, blockIndex],
    }),
  );
}

export async function getLatestBalance(
  requestManager: Web3RequestManager<TolarRpcApi>,
  address: Address,
): Promise<BalanceOutput> {
  return toBalanceOutput(
    await requestManager.send({
      method: "tol_getLatestBalance",
      params: [address],
    }),
  );
}

export async function getNonce(
  requestManager: Web3RequestManager<TolarRpcApi>,
  address: Address,
): Promise<bigint> {
  const strNonce: string = await requestManager.send({
    method: "tol_getNonce",
    params: [address],
  });

  return BigInt(strNonce);
}

export async function getBlockchainInfo(
  requestManager: Web3RequestManager<TolarRpcApi>,
): Promise<BlockchainInfo> {
  const rawInfo: Map<string, unknown> = await requestManager.send({
    method: "tol_getBlockchainInfo",
    params: [],
  });

  return {
    lastConfirmedBlockHash: rawInfo.get(
      "last_confirmed_block_hash",
    ) as HexString,
    totalBlocksCount: rawInfo.get("total_blocks_count") as number,
    confirmedBlocksCount: rawInfo.get("confirmed_blocks_count") as number,
  };
}

function toTxResponse(rawTxResponse: Map<string, unknown>): TxResponse {
  return {
    transactionHash: rawTxResponse.get("transaction_hash") as Hash,
    blockHash: rawTxResponse.get("block_hash") as Hash,
    transactionIndex: rawTxResponse.get("transaction_index") as number,
    senderAddress: rawTxResponse.get("sender_address") as Address,
    receiverAddress: rawTxResponse.get("receiver_address") as Address,
    value: BigInt(rawTxResponse.get("value") as AttoTol),
    gas: BigInt(rawTxResponse.get("gas") as AttoTol),
    gasPrice: BigInt(rawTxResponse.get("gas_price") as AttoTol),
    data: rawTxResponse.get("data") as HexString,
    nonce: BigInt(rawTxResponse.get("nonce") as bigint),
    networkId: rawTxResponse.get("network_id") as NetworkId,
    confirmationTimestamp: new Date(
      rawTxResponse.get("confirmation_timestamp") as number,
    ),
    gasUsed: BigInt(rawTxResponse.get("gas_used") as string),
    gasRefunded: BigInt(rawTxResponse.get("gas_refunded") as string),
    newAddress: rawTxResponse.get("new_address") as Address,
    output: rawTxResponse.get("output") as HexString,
    excepted: rawTxResponse.get("excepted") as boolean,
    exception: rawTxResponse.get("exception") as number,
  };
}

export async function getTransaction(
  requestManager: Web3RequestManager<TolarRpcApi>,
  transactionHash: Hash,
): Promise<TxResponse> {
  return toTxResponse(
    await requestManager.send({
      method: "tol_getTransaction",
      params: [transactionHash],
    }),
  );
}

type RawTransactionList = { transactions: Map<string, unknown>[] };

export async function getTransactionList(
  requestManager: Web3RequestManager<TolarRpcApi>,
  addresses: Address[],
  limit: number,
  skip: number,
): Promise<TxResponse[]> {
  const rawTxResponses: RawTransactionList = await requestManager.send({
    method: "tol_getTransactionList",
    params: [addresses, limit, skip],
  });

  return rawTxResponses.transactions.map((rawTxResponse) =>
    toTxResponse(rawTxResponse),
  );
}

type RawPastEventsResponse = {
  past_events: Map<string, unknown>[];
};

function toPastEvent(rawPastEvent: Map<string, unknown>): PastEvent {
  return {
    address: rawPastEvent.get("address") as Address,
    topic: rawPastEvent.get("topic") as Hash,
    topicArg0: rawPastEvent.get("topic_arg_0") as Hash,
    topicArg1: rawPastEvent.get("topic_arg_1") as Hash,
    topicArg2: rawPastEvent.get("topic_arg_2") as Hash,
    data: rawPastEvent.get("data") as HexStringBytes,
    transactionHash: rawPastEvent.get("transaction_hash") as Hash,
    blockHash: rawPastEvent.get("block_hash") as Hash,
    blockIndex: rawPastEvent.get("block_index") as number,
  };
}

export async function getPastEvents(
  requestManager: Web3RequestManager<TolarRpcApi>,
  address: Address,
  topic: Hash,
): Promise<PastEvent[]> {
  const rawPastEvents: RawPastEventsResponse = await requestManager.send({
    method: "tol_getPastEvents",
    params: [address, topic],
  });

  return rawPastEvents.past_events.map((rawPastEvents) =>
    toPastEvent(rawPastEvents),
  );
}

function toLogEntry(rawLogEntry: Map<string, unknown>): LogEntry {
  return {
    address: rawLogEntry.get("address") as Address,
    topics: rawLogEntry.get("topics") as Hash[],
    data: rawLogEntry.get("data") as HexStringBytes,
  };
}

function toTransactionReceipt(
  rawTransactionReceipt: Map<string, unknown>,
): TransactionReceipt {
  return {
    excepted: rawTransactionReceipt.get("excepted") as boolean,
    blockHash: rawTransactionReceipt.get("block_hash") as Hash,
    blockIndex: rawTransactionReceipt.get("block_index") as number,
    transactionHash: rawTransactionReceipt.get("transaction_hash") as Hash,
    transactionIndex: rawTransactionReceipt.get("transaction_index") as number,
    senderAddress: rawTransactionReceipt.get("sender_address") as Address,
    receiverAddress: rawTransactionReceipt.get("receiver_address") as Address,
    newAddress: rawTransactionReceipt.get("new_address") as Address,
    gasUsed: BigInt(rawTransactionReceipt.get("gas_used") as string),
    logs: (rawTransactionReceipt.get("logs") as Map<string, unknown>[]).map(
      (rawLogEntry) => toLogEntry(rawLogEntry),
    ),
    exception: rawTransactionReceipt.get("exception") as number,
  };
}

export async function getTransactionReceipt(
  requestManager: Web3RequestManager<TolarRpcApi>,
  transactionHash: Hash,
): Promise<TransactionReceipt> {
  return toTransactionReceipt(
    await requestManager.send({
      method: "tol_getTransactionReceipt",
      params: [transactionHash],
    }),
  );
}

export async function getPeerCount(
  requestManager: Web3RequestManager<TolarRpcApi>,
): Promise<number> {
  return requestManager.send({
    method: "net_peerCount",
    params: [],
  });
}

export async function getMasterNodeCount(
  requestManager: Web3RequestManager<TolarRpcApi>,
): Promise<number> {
  return requestManager.send({
    method: "net_masterNodeCount",
    params: [],
  });
}

export async function isMasterNode(
  requestManager: Web3RequestManager<TolarRpcApi>,
): Promise<boolean> {
  return requestManager.send({
    method: "net_isMasterNode",
    params: [],
  });
}

export async function sendSignedTransaction(
  requestManager: Web3RequestManager<TolarRpcApi>,
  signedTransaction: HexStringBytes,
): Promise<Hash> {
  return requestManager.send({
    method: "tx_sendSignedTransaction",
    params: [signedTransaction],
  });
}
