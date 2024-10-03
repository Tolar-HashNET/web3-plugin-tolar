import type { core, HexString } from "web3";

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
  NetworkId,
  RpcTransactionReceipt,
  RpcLogEntry,
} from "./types";

function removeHexPrefix(value: HexString): string {
  if (value.startsWith("0x") || value.startsWith("0X")) {
    return value.slice(2);
  }

  return value;
}

function txRequestToParameters(txRequest: RpcTxRequest): (string | number)[] {
  return [
    removeHexPrefix(txRequest.senderAddress),
    removeHexPrefix(txRequest.receiverAddress),
    txRequest.amount.toString(),
    txRequest.gas.toString(),
    txRequest.gasPrice.toString(),
    removeHexPrefix(txRequest.data),
    txRequest.nonce.toString(),
    txRequest.networkId,
  ];
}

function appendHexPrefix(value: HexString): string {
  return `0x${value}`;
}

export interface TolarExecutionAPI {
  getBlockCount: () => number;
  getLatestBlock: () => RpcBlock;
  getBlockByHash: (blockHash: StrHexHash) => RpcBlock;
  getBlockByIndex: (blockIndex: number) => RpcBlock;
  getGasEstimate: (txRequest: RpcTxRequest) => AttoTol;
  tryCallTransaction: (txRequest: RpcTxRequest) => RpcTryCallOutput;
  getBalance: (address: StrHexAddress, blockIndex: number) => RpcBalanceOutput;
  getLatestBalance: (address: StrHexAddress) => RpcBalanceOutput;
  getNonce: (address: StrHexAddress) => bigint;
  getBlockchainInfo: () => RpcBlockchainInfo;
  getTransaction: (transactionHash: StrHexHash) => RpcTxResponse;
  getTransactionList: (
    transactionHashes: StrHexHash[],
    limit: number,
    skip: number,
  ) => RpcTxResponse[];
  getPastEvents: (address: StrHexAddress, topic: StrHexHash) => RpcPastEvent[];
  getTransactionReceipt: (transactionHash: StrHexHash) => RpcTransactionReceipt;
  getPeerCount: () => number;
  getMasterNodeCount: () => number;
  isMasterNode: () => boolean;
  sendSignedTransaction: (signedTransaction: HexString) => StrHexHash;
}

export async function getBlockCount(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
): Promise<number> {
  return requestManager.send({
    method: "tol_getBlockCount",
    params: [],
  });
}

function toBlock(rawBlockObj: object): RpcBlock {
  const rawBlock = new Map(Object.entries(rawBlockObj));

  return {
    blockIndex: rawBlock.get("block_index") as number,
    blockHash: appendHexPrefix(rawBlock.get("block_hash") as StrHexHash),
    confirmationTimestamp: new Date(
      rawBlock.get("confirmation_timestamp") as number,
    ),
    previousBlockHash: appendHexPrefix(
      rawBlock.get("previous_block_hash") as StrHexHash,
    ),
    transactionHashes: (rawBlock.get("transaction_hashes") as StrHexHash[]).map(
      appendHexPrefix,
    ),
  };
}

export async function getLatestBlock(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
): Promise<RpcBlock> {
  return toBlock(
    await requestManager.send({
      method: "tol_getLatestBlock",
      params: [],
    }),
  );
}

export async function getBlockByHash(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
  blockHash: StrHexHash,
): Promise<RpcBlock> {
  return toBlock(
    await requestManager.send({
      method: "tol_getBlockByHash",
      params: [removeHexPrefix(blockHash)],
    }),
  );
}

export async function getBlockByIndex(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
  blockIndex: number,
): Promise<RpcBlock> {
  return toBlock(
    await requestManager.send({
      method: "tol_getBlockByIndex",
      params: [blockIndex],
    }),
  );
}

export async function getGasEstimate(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
  txRequest: RpcTxRequest,
): Promise<AttoTol> {
  return BigInt(
    await requestManager.send({
      method: "tol_getGasEstimate",
      params: txRequestToParameters(txRequest),
    }),
  );
}

function toTryCallOutput(rawTryCallOutputObject: object): RpcTryCallOutput {
  const rawTryCallOutput = new Map(Object.entries(rawTryCallOutputObject));
  return {
    output: appendHexPrefix(rawTryCallOutput.get("output") as string),
    excepted: rawTryCallOutput.get("excepted") as boolean,
  };
}

export async function tryCallTransaction(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
  txRequest: RpcTxRequest,
): Promise<RpcTryCallOutput> {
  return toTryCallOutput(
    await requestManager.send({
      method: "tol_tryCallTransaction",
      params: txRequestToParameters(txRequest),
    }),
  );
}

function toBalanceOutput(rawBalanceObj: object): RpcBalanceOutput {
  const rawBalance = new Map(Object.entries(rawBalanceObj));

  return {
    balance: BigInt(rawBalance.get("balance") as string),
    blockIndex: rawBalance.get("block_index") as number,
  };
}

export async function getBalance(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
  address: StrHexAddress,
  blockIndex: number,
): Promise<RpcBalanceOutput> {
  return toBalanceOutput(
    await requestManager.send({
      method: "tol_getBalance",
      params: [removeHexPrefix(address), blockIndex],
    }),
  );
}

export async function getLatestBalance(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
  address: StrHexAddress,
): Promise<RpcBalanceOutput> {
  return toBalanceOutput(
    await requestManager.send({
      method: "tol_getLatestBalance",
      params: [removeHexPrefix(address)],
    }),
  );
}

export async function getNonce(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
  address: StrHexAddress,
): Promise<bigint> {
  return BigInt(
    await requestManager.send({
      method: "tol_getNonce",
      params: [removeHexPrefix(address)],
    }),
  );
}

export async function getBlockchainInfo(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
): Promise<RpcBlockchainInfo> {
  const rawInfoObj: object = await requestManager.send({
    method: "tol_getBlockchainInfo",
    params: [],
  });

  const rawInfo = new Map(Object.entries(rawInfoObj));
  return {
    lastConfirmedBlockHash: appendHexPrefix(
      rawInfo.get("last_confirmed_block_hash") as HexString,
    ),
    totalBlocksCount: rawInfo.get("total_blocks_count") as number,
    confirmedBlocksCount: rawInfo.get("confirmed_blocks_count") as number,
  };
}

function toTxResponse(rawTxResponseObj: object): RpcTxResponse {
  const rawTxResponse = new Map(Object.entries(rawTxResponseObj));

  return {
    transactionHash: appendHexPrefix(
      rawTxResponse.get("transaction_hash") as StrHexHash,
    ),
    blockHash: appendHexPrefix(rawTxResponse.get("block_hash") as StrHexHash),
    transactionIndex: rawTxResponse.get("transaction_index") as number,
    senderAddress: appendHexPrefix(
      rawTxResponse.get("sender_address") as StrHexAddress,
    ),
    receiverAddress: appendHexPrefix(
      rawTxResponse.get("receiver_address") as StrHexAddress,
    ),
    value: BigInt(rawTxResponse.get("value") as AttoTol),
    gas: BigInt(rawTxResponse.get("gas") as AttoTol),
    gasPrice: BigInt(rawTxResponse.get("gas_price") as AttoTol),
    data: appendHexPrefix(rawTxResponse.get("data") as HexString),
    nonce: BigInt(rawTxResponse.get("nonce") as bigint),
    networkId: rawTxResponse.get("network_id") as NetworkId,
    confirmationTimestamp: new Date(
      rawTxResponse.get("confirmation_timestamp") as number,
    ),
    gasUsed: BigInt(rawTxResponse.get("gas_used") as string),
    gasRefunded: BigInt(rawTxResponse.get("gas_refunded") as string),
    newAddress: appendHexPrefix(
      rawTxResponse.get("new_address") as StrHexAddress,
    ),
    output: appendHexPrefix(rawTxResponse.get("output") as HexString),
    excepted: rawTxResponse.get("excepted") as boolean,
    exception: rawTxResponse.get("exception") as number,
  };
}

export async function getTransaction(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
  transactionHash: StrHexHash,
): Promise<RpcTxResponse> {
  return toTxResponse(
    await requestManager.send({
      method: "tol_getTransaction",
      params: [removeHexPrefix(transactionHash)],
    }),
  );
}

type RawTransactionList = { transactions: object[] };

export async function getTransactionList(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
  addresses: StrHexAddress[],
  limit: number,
  skip: number,
): Promise<RpcTxResponse[]> {
  const rawTxResponses: RawTransactionList = await requestManager.send({
    method: "tol_getTransactionList",
    params: [addresses.map(removeHexPrefix), limit, skip],
  });

  return rawTxResponses.transactions.map((rawTxResponse) =>
    toTxResponse(rawTxResponse),
  );
}

type RawPastEventsResponse = {
  past_events: object[];
};

function toPastEvent(rawPastEventObj: object): RpcPastEvent {
  const rawPastEvent = new Map(Object.entries(rawPastEventObj));

  return {
    address: appendHexPrefix(rawPastEvent.get("address") as StrHexAddress),
    topic: appendHexPrefix(rawPastEvent.get("topic") as StrHexHash),
    topicArg0: appendHexPrefix(
      (rawPastEvent.get("topic_arg_0") ?? "") as StrHexHash,
    ),
    topicArg1: appendHexPrefix(
      (rawPastEvent.get("topic_arg_1") ?? "") as StrHexHash,
    ),
    topicArg2: appendHexPrefix(
      (rawPastEvent.get("topic_arg_2") ?? "") as StrHexHash,
    ),
    data: appendHexPrefix(rawPastEvent.get("data") as HexString),
    transactionHash: appendHexPrefix(
      rawPastEvent.get("transaction_hash") as StrHexHash,
    ),
    blockHash: appendHexPrefix(rawPastEvent.get("block_hash") as StrHexHash),
    blockIndex: rawPastEvent.get("block_index") as number,
  };
}

export async function getPastEvents(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
  address: StrHexAddress,
  topic: StrHexHash,
): Promise<RpcPastEvent[]> {
  const rawPastEvents: RawPastEventsResponse = await requestManager.send({
    method: "tol_getPastEvents",
    params: [removeHexPrefix(address), removeHexPrefix(topic)],
  });

  return rawPastEvents.past_events.map((rawPastEvents) =>
    toPastEvent(rawPastEvents),
  );
}

function toLogEntry(rawLogEntryObject: object): RpcLogEntry {
  const rawLogEntry = new Map(Object.entries(rawLogEntryObject));
  const res = {
    address: appendHexPrefix(rawLogEntry.get("address") as StrHexAddress),
    topics: rawLogEntry.get("topics") as StrHexHash[],
    data: appendHexPrefix(rawLogEntry.get("data") as HexString),
  };

  res.topics = res.topics.map((topic) => appendHexPrefix(topic));

  return res;
}

function toTransactionReceipt(
  rawTransactionReceiptObj: object,
): RpcTransactionReceipt {
  const rawTransactionReceipt = new Map(
    Object.entries(rawTransactionReceiptObj),
  );

  return {
    excepted: rawTransactionReceipt.get("excepted") as boolean,
    blockHash: appendHexPrefix(
      rawTransactionReceipt.get("block_hash") as StrHexHash,
    ),
    blockIndex: rawTransactionReceipt.get("block_index") as number,
    transactionHash: appendHexPrefix(
      rawTransactionReceipt.get("transaction_hash") as StrHexHash,
    ),
    transactionIndex: rawTransactionReceipt.get("transaction_index") as number,
    senderAddress: appendHexPrefix(
      rawTransactionReceipt.get("sender_address") as StrHexAddress,
    ),
    receiverAddress: appendHexPrefix(
      rawTransactionReceipt.get("receiver_address") as StrHexAddress,
    ),
    newAddress: appendHexPrefix(
      rawTransactionReceipt.get("new_address") as StrHexAddress,
    ),
    gasUsed: BigInt(rawTransactionReceipt.get("gas_used") as string),
    logs: (rawTransactionReceipt.get("logs") as object[]).map((rawLogEntry) =>
      toLogEntry(rawLogEntry),
    ),
    exception: rawTransactionReceipt.get("exception") as number,
  };
}

export async function getTransactionReceipt(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
  transactionHash: StrHexHash,
): Promise<RpcTransactionReceipt> {
  return toTransactionReceipt(
    await requestManager.send({
      method: "tol_getTransactionReceipt",
      params: [removeHexPrefix(transactionHash)],
    }),
  );
}

export async function getPeerCount(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
): Promise<number> {
  return Number(
    await requestManager.send({
      method: "net_peerCount",
      params: [],
    }),
  );
}

export async function getMasterNodeCount(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
): Promise<number> {
  return Number(
    await requestManager.send({
      method: "net_masterNodeCount",
      params: [],
    }),
  );
}

export async function isMasterNode(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
): Promise<boolean> {
  return requestManager.send({
    method: "net_isMasterNode",
    params: [],
  });
}

export async function sendSignedTransaction(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
  signedTransaction: HexString,
): Promise<StrHexHash> {
  return appendHexPrefix(
    await requestManager.send({
      method: "tx_sendSignedTransaction",
      params: [removeHexPrefix(signedTransaction)],
    }),
  );
}
