import { keccak256 } from "ethereum-cryptography/keccak";
import type { Address as EthAddress, HexString } from "web3";
import { utils, validator } from "web3";
import { bigIntToUint8Array } from "web3-eth-accounts";

import type {
  AttoTol,
  RpcBalanceOutput,
  RpcBlock, RpcLogEntry,
  RpcPastEvent, RpcTransactionReceipt, RpcTryCallOutput,
  RpcTxResponse,
  StrHexAddress,
  StrHexHash,
  TolNum
} from "./types";
import { NetworkId, NetworkName } from "./types";
import { isPublicKeyValid, isTolAddressValid } from "./validation";
import { appendHexPrefix } from "./utils";

const encoder = new TextEncoder();
const protoEncode = encoder.encode.bind(encoder);

const decoder = new TextDecoder("utf-8");
const protoDecode = decoder.decode.bind(decoder);

export function toTolHexAddress(
  ethAddress: EthAddress,
  checkEthAddress: boolean = true,
): StrHexAddress {
  if (checkEthAddress && !validator.isAddress(ethAddress)) {
    throw new Error("Ethereum address is invalid");
  }

  const hashOfHash: StrHexHash = utils.soliditySha3(
    utils.soliditySha3(ethAddress)!,
  )!;

  return (
    "0x54" +
    ethAddress.substring(2) +
    hashOfHash.substring(hashOfHash.length - 8)
  ).toLowerCase();
}

export function toEthAddress(tolAddress: StrHexAddress): EthAddress {
  const valid = isTolAddressValid(tolAddress);
  if (valid.length !== 0) {
    throw new Error(valid);
  }

  return `0x${tolAddress.substring(4, 44)}`;
}

export function toTolHexAddressFromPublicKey(
  publicKey: Uint8Array | string,
): StrHexAddress {
  const valid = isPublicKeyValid(publicKey);
  if (valid.length !== 0) {
    throw new Error(valid);
  }

  if (typeof publicKey === "string") {
    publicKey = utils.hexToBytes(publicKey);
  }

  const ethAddress = utils.bytesToHex(keccak256(publicKey).slice(-20));
  return toTolHexAddress(ethAddress, false);
}

export function toU256Proto(num: bigint): Uint8Array {
  if (num < 0) {
    throw new Error("Number must be greater than 0");
  }

  return bigIntToUint8Array(num);
}

export function encodeToProto(data: HexString): Uint8Array {
  if (validator.isHexString(data)) {
    return protoEncode(data.toLowerCase().slice(2));
  }

  return protoEncode(data);
}

export function decodeFromProto(protoValue: Uint8Array): HexString {
  return protoValue.length === 0 ? "0x" : `0x${protoDecode(protoValue)}`;
}

const NETWORK_NAMES_TO_IDS = new Map<string, NetworkId>([
  [NetworkName.Local, NetworkId.Local],
  [NetworkName.Mainnet, NetworkId.Mainnet],
  [NetworkName.Testnet, NetworkId.Testnet],
  [NetworkName.Stagenet, NetworkId.Stagenet],
]);

export function toNetworkId(network: string | number): NetworkId {
  if (typeof network === "string") {
    const id = NETWORK_NAMES_TO_IDS.get(network);
    if (id) {
      return id;
    }
  } else {
    if (NetworkId[network]) {
      return network;
    }
  }

  throw new Error(`Unknown network ${network}`);
}

export function toRpcBlock(rawBlockObj: object): RpcBlock {
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

export function toRpcBalanceOutput(rawBalanceObj: object): RpcBalanceOutput {
  const rawBalance = new Map(Object.entries(rawBalanceObj));

  return {
    balance: rawBalance.get("balance") as string,
    blockIndex: rawBalance.get("block_index") as number,
  };
}

export function toRpcTxResponse(rawTxResponseObj: object): RpcTxResponse {
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
    value: rawTxResponse.get("value") as AttoTol,
    gas: rawTxResponse.get("gas") as AttoTol,
    gasPrice: rawTxResponse.get("gas_price") as AttoTol,
    data: appendHexPrefix(rawTxResponse.get("data") as HexString),
    nonce: rawTxResponse.get("nonce") as TolNum,
    networkId: rawTxResponse.get("network_id") as NetworkId,
    confirmationTimestamp: new Date(
      rawTxResponse.get("confirmation_timestamp") as number,
    ),
    gasUsed: rawTxResponse.get("gas_used") as string,
    gasRefunded: rawTxResponse.get("gas_refunded") as string,
    newAddress: appendHexPrefix(
      rawTxResponse.get("new_address") as StrHexAddress,
    ),
    output: appendHexPrefix(rawTxResponse.get("output") as HexString),
    excepted: rawTxResponse.get("excepted") as boolean,
    exception: rawTxResponse.get("exception") as number,
  };
}

export function toRpcPastEvent(rawPastEventObj: object): RpcPastEvent {
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

export function toRpcTryCallOutput(rawTryCallOutputObject: object): RpcTryCallOutput {
  const rawTryCallOutput = new Map(Object.entries(rawTryCallOutputObject));
  return {
    output: appendHexPrefix(rawTryCallOutput.get("output") as string),
    excepted: rawTryCallOutput.get("excepted") as boolean,
  };
}

export function toRpcLogEntry(rawLogEntryObject: object): RpcLogEntry {
  const rawLogEntry = new Map(Object.entries(rawLogEntryObject));
  const res = {
    address: appendHexPrefix(rawLogEntry.get("address") as StrHexAddress),
    topics: rawLogEntry.get("topics") as StrHexHash[],
    data: appendHexPrefix(rawLogEntry.get("data") as HexString),
  };

  res.topics = res.topics.map((topic) => appendHexPrefix(topic));

  return res;
}

export function toRpcTransactionReceipt(
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
    gasUsed: rawTransactionReceipt.get("gas_used") as AttoTol,
    logs: (rawTransactionReceipt.get("logs") as object[]).map((rawLogEntry) =>
      toRpcLogEntry(rawLogEntry),
    ),
    exception: rawTransactionReceipt.get("exception") as number,
  };
}