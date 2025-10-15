import type { core, HexString } from "web3";

import {
  toRpcBlock,
  toNetworkId,
  toRpcBalanceOutput,
  toRpcTxResponse,
  toRpcPastEvent,
  toRpcTryCallOutput, toRpcTransactionReceipt
} from "./converters";
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
  NetworkInfo,
  TolNum,
} from "./types";
import { appendHexPrefix, removeHexPrefix } from "./utils";

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

export interface TolarExecutionAPI {
  getBlockCount: () => number;
  getLatestBlock: () => RpcBlock;
  getBlockByHash: (blockHash: StrHexHash) => RpcBlock;
  getBlockByIndex: (blockIndex: number) => RpcBlock;
  getGasEstimate: (txRequest: RpcTxRequest) => AttoTol;
  tryCallTransaction: (txRequest: RpcTxRequest) => RpcTryCallOutput;
  getBalance: (address: StrHexAddress, blockIndex: number) => RpcBalanceOutput;
  getLatestBalance: (address: StrHexAddress) => RpcBalanceOutput;
  getNonce: (address: StrHexAddress) => TolNum;
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
  requestAccounts: () => StrHexAddress[];
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

export async function getLatestBlock(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
): Promise<RpcBlock> {
  return toRpcBlock(
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
  return toRpcBlock(
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
  return toRpcBlock(
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
  return await requestManager.send({
    method: "tol_getGasEstimate",
    params: txRequestToParameters(txRequest),
  });
}

export async function tryCallTransaction(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
  txRequest: RpcTxRequest,
): Promise<RpcTryCallOutput> {
  return toRpcTryCallOutput(
    await requestManager.send({
      method: "tol_tryCallTransaction",
      params: txRequestToParameters(txRequest),
    }),
  );
}

export async function getBalance(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
  address: StrHexAddress,
  blockIndex: number,
): Promise<RpcBalanceOutput> {
  return toRpcBalanceOutput(
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
  return toRpcBalanceOutput(
    await requestManager.send({
      method: "tol_getLatestBalance",
      params: [removeHexPrefix(address)],
    }),
  );
}

export async function getNonce(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
  address: StrHexAddress,
): Promise<TolNum> {
  return await requestManager.send({
    method: "tol_getNonce",
    params: [removeHexPrefix(address)],
  });
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

export async function getTransaction(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
  transactionHash: StrHexHash,
): Promise<RpcTxResponse> {
  return toRpcTxResponse(
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
    toRpcTxResponse(rawTxResponse),
  );
}

type RawPastEventsResponse = {
  past_events: object[];
};

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
    toRpcPastEvent(rawPastEvents),
  );
}

export async function getPastEventsByBlockRange(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
  address: StrHexAddress,
  topic: StrHexHash,
  fromBlockIdx: number,
  toBlockIdx: number,
): Promise<RpcPastEvent[]> {
  const rawPastEvents: RawPastEventsResponse = await requestManager.send({
    method: "tol_getPastEventsFromBlocks",
    params: [
      removeHexPrefix(address),
      removeHexPrefix(topic),
      fromBlockIdx,
      toBlockIdx,
    ],
  });

  return rawPastEvents.past_events.map((rawPastEvents) =>
    toRpcPastEvent(rawPastEvents),
  );
}

export async function getTransactionReceipt(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
  transactionHash: StrHexHash,
): Promise<RpcTransactionReceipt> {
  return toRpcTransactionReceipt(
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

export async function requestAccounts(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
): Promise<StrHexAddress[]> {
  return requestManager.send({
    method: "tol_requestAccounts",
    params: [],
  });
}

export async function switchNetwork(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
  network: string | number,
): Promise<NetworkInfo> {
  const networkId = toNetworkId(network);

  return await requestManager.send({
    method: "tol_switchNetwork",
    params: [networkId],
  });
}

export async function getAccounts(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
): Promise<StrHexAddress[]> {
  return await requestManager.send({
    method: "tol_getAccounts",
    params: [],
  });
}

export async function getCurrentBalance(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
): Promise<RpcBalanceOutput> {
  return await requestManager.send({
    method: "tol_getCurrentBalance",
    params: [],
  });
}

export async function getPublicKey(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
): Promise<StrHexAddress> {
  return await requestManager.send({
    method: "tol_getPublicKey",
    params: [],
  });
}

export async function sendRawTransaction(
  requestManager: core.Web3RequestManager<TolarExecutionAPI>,
  tx: RpcTxRequest,
): Promise<StrHexHash> {
  return await requestManager.send({
    method: "tol_sendRawTransaction",
    params: [tx],
  });
}
