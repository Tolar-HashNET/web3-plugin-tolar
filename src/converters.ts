import { keccak256 } from "ethereum-cryptography/keccak";
import type { Address as EthAddress, HexString } from "web3";
import { utils, validator } from "web3";
import { bigIntToUint8Array } from "web3-eth-accounts";

import type { StrHexAddress, StrHexHash } from "./types";
import { isPublicKeyValid, isTolAddressValid } from "./validation";

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
