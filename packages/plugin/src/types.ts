import type { HexString, HexString32Bytes } from "web3";

export enum NetworkId {
  Local = 0,
  Mainnet = 1,
  Testnet = 2,
  Stagenet = 3,
}

export enum NetworkName {
  Local = "TolLocal",
  Mainnet = "Tol",
  Testnet = "TolTestnet",
  Stagenet = "TolStaging",
}

export type StrHexAddress = HexString;
export type StrHexHash = HexString32Bytes;
export type TolNum = string;
export type AttoTol = TolNum;

export const ZERO_HEX_ADDRESS: StrHexAddress =
  "0x54000000000000000000000000000000000000000023199e2b";
export const INVALID_NONCE: TolNum = BigInt(
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
).toString();

export const MIN_GAS: AttoTol = "21000";
export const MIN_GAS_PRICE: AttoTol = "1";

export type RpcBlock = {
  blockIndex: number;
  blockHash: StrHexHash;
  confirmationTimestamp: Date;
  previousBlockHash: StrHexHash;
  transactionHashes: StrHexHash[];
};

export type RpcTxRequest = {
  senderAddress: StrHexAddress;
  receiverAddress: StrHexAddress;
  amount: AttoTol;
  gas: AttoTol;
  gasPrice: AttoTol;
  data: HexString;
  nonce: TolNum;
  networkId: NetworkId;
};

export type RpcTryCallOutput = {
  output: HexString;
  excepted: boolean;
};

export type RpcBalanceOutput = {
  balance: AttoTol;
  blockIndex: number;
};

export type RpcBlockchainInfo = {
  confirmedBlocksCount: number;
  totalBlocksCount: number;
  lastConfirmedBlockHash: HexString;
};

export type RpcTxResponse = {
  transactionHash: StrHexHash;
  blockHash: StrHexHash;
  transactionIndex: number;
  senderAddress: StrHexAddress;
  receiverAddress: StrHexAddress;
  value: AttoTol;
  gas: AttoTol;
  gasPrice: AttoTol;
  data: HexString;
  nonce: TolNum;
  networkId: NetworkId;
  confirmationTimestamp: Date;
  gasUsed: AttoTol;
  gasRefunded: AttoTol;
  newAddress: StrHexAddress;
  output: HexString;
  excepted: boolean;
  exception: number;
};

export type RpcPastEvent = {
  address: StrHexAddress;
  topic: StrHexHash;
  topicArg0: StrHexHash;
  topicArg1: StrHexHash;
  topicArg2: StrHexHash;
  data: HexString;
  transactionHash: StrHexHash;
  blockHash: StrHexHash;
  blockIndex: number;
};

export type RpcLogEntry = {
  address: StrHexAddress;
  topics: StrHexHash[];
  data: HexString;
};

export type RpcTransactionReceipt = {
  excepted: boolean;
  blockHash: StrHexHash;
  blockIndex: number;
  transactionHash: StrHexHash;
  transactionIndex: number;
  senderAddress: StrHexAddress;
  receiverAddress: StrHexAddress;
  newAddress: StrHexAddress;
  gasUsed: AttoTol;
  logs: RpcLogEntry[];
  exception: number;
};

export type NetworkInfo = {
  name: string;
  node: string;
  networkId: NetworkId;
};
