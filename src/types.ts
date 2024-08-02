import type { HexString, HexString32Bytes, HexStringBytes } from "web3";
import { utils } from "web3";

import {
  isTolAddressValid,
  toEthAddress,
  toTolHexAddress,
  toTolHexAddressFromPublicKey,
} from "./utils";

export enum NetworkId {
  Local = 0,
  Mainnet = 1,
  Testnet = 2,
  Stagenet = 3,
}

export type Address = HexString;
export type Hash = HexString32Bytes;
export type AttoTol = bigint;

export class TolAddress {
  public readonly raw: Uint8Array;

  public constructor(address: Uint8Array | Address) {
    const valid = isTolAddressValid(address);
    if (valid.length !== 0) {
      throw new Error(valid);
    }

    this.raw =
      typeof address === "string" ? utils.hexToBytes(address) : address;
  }

  public static fromEthAddress(ethAddress: HexString | Uint8Array): TolAddress {
    if (typeof ethAddress !== "string") {
      ethAddress = utils.bytesToHex(ethAddress);
    }

    return new TolAddress(toTolHexAddress(ethAddress));
  }

  public static fromPublicKey(ethAddress: HexString | Uint8Array): TolAddress {
    return new TolAddress(toTolHexAddressFromPublicKey(ethAddress));
  }

  public toEthAddress(): HexString {
    return toEthAddress(this.toString());
  }

  public equals(address: TolAddress): boolean {
    return utils.uint8ArrayEquals(this.raw, address.raw);
  }

  public toString(): string {
    return utils.bytesToHex(this.raw);
  }

  public isZero(): boolean {
    return this.equals(ZERO_ADDRESS);
  }
}

export const ZERO_STR_ADDRESS: Address =
  "0x54000000000000000000000000000000000000000023199e2b";
export const ZERO_ADDRESS: TolAddress = new TolAddress(ZERO_STR_ADDRESS);
export const MIN_GAS: AttoTol = 21_000n;
export const MIN_GAS_PRICE: AttoTol = 1n;

export type Block = {
  blockIndex: number;
  blockHash: Hash;
  confirmationTimestamp: Date;
  previousBlockHash: Hash;
  transactionHashes: Hash[];
};

export type TxRequest = {
  senderAddress: Address;
  receiverAddress: Address;
  amount: AttoTol;
  gas: AttoTol;
  gasPrice: AttoTol;
  data: HexStringBytes;
  nonce: bigint;
  networkId: NetworkId;
};

export type TryCallOutput = {
  output: HexString;
  excepted: boolean;
};

export type BalanceOutput = {
  balance: AttoTol;
  blockIndex: number;
};

export type BlockchainInfo = {
  confirmedBlocksCount: number;
  totalBlocksCount: number;
  lastConfirmedBlockHash: HexString;
};

export type TxResponse = {
  transactionHash: Hash;
  blockHash: Hash;
  transactionIndex: number;
  senderAddress: Address;
  receiverAddress: Address;
  value: AttoTol;
  gas: AttoTol;
  gasPrice: AttoTol;
  data: HexString;
  nonce: bigint;
  networkId: NetworkId;
  confirmationTimestamp: Date;
  gasUsed: AttoTol;
  gasRefunded: AttoTol;
  newAddress: Address;
  output: HexString;
  excepted: boolean;
  exception: number;
};

export type PastEvent = {
  address: Address;
  topic: Hash;
  topicArg0: Hash;
  topicArg1: Hash;
  topicArg2: Hash;
  data: HexStringBytes;
  transactionHash: Hash;
  blockHash: Hash;
  blockIndex: number;
};

export type LogEntry = {
  address: Address;
  topics: Hash[];
  data: HexStringBytes;
};

export type TransactionReceipt = {
  excepted: boolean;
  blockHash: Hash;
  blockIndex: number;
  transactionHash: Hash;
  transactionIndex: number;
  senderAddress: Address;
  receiverAddress: Address;
  newAddress: Address;
  gasUsed: AttoTol;
  logs: LogEntry[];
  exception: number;
};
