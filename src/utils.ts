import { keccak256 } from "ethereum-cryptography/keccak";
import { utils, validator } from "web3";
import type { Address as EthAddress } from "web3";

import type { Address, Hash } from "./types";

export function toTolHexAddress(
  ethAddress: EthAddress,
  checkEthAddress: boolean = true,
): Address {
  if (checkEthAddress && !validator.isAddress(ethAddress)) {
    throw new Error("Ethereum address is invalid");
  }

  const hashOfHash: Hash = utils.soliditySha3(utils.soliditySha3(ethAddress)!)!;

  return (
    "0x54" +
    ethAddress.substring(2) +
    hashOfHash.substring(hashOfHash.length - 8)
  ).toLowerCase();
}

export function toEthAddress(tolAddress: Address): EthAddress {
  const valid = isTolAddressValid(tolAddress);
  if (valid.length !== 0) {
    throw new Error(valid);
  }

  return `0x${tolAddress.substring(4, 44)}`;
}

export function toTolHexAddressFromPublicKey(
  publicKey: Uint8Array | string,
): Address {
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

export function isTolAddressValid(address: Uint8Array | Address): string {
  if (typeof address === "string") {
    if (!validator.isHexString(address, 25)) {
      return "Tolar address must be hex string";
    }

    if (!address.startsWith("0x54")) {
      return "Tolar address must start with string 0x54";
    }
  } else {
    if (address.length !== 25) {
      return "Tolar address length mast be 25 bytes long";
    }

    if (address.at(0) !== 84) {
      return "Tolar address must start with byte 0x54";
    }
  }

  return "";
}

export function isPublicKeyValid(publicKey: Uint8Array | Address): string {
  if (typeof publicKey === "string") {
    if (!validator.isHexString(publicKey, 128)) {
      return "Public key must be hex string with 128 hex digits";
    }
  } else {
    if (publicKey.length !== 64) {
      return "Public key must have 64 bytes";
    }
  }

  return "";
}
