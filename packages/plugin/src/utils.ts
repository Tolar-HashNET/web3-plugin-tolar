import type { HexString } from "web3";

export function appendHexPrefix(value: HexString): string {
  return `0x${value}`;
}

export function removeHexPrefix(value: HexString): string {
  if (value.startsWith("0x") || value.startsWith("0X")) {
    return value.slice(2);
  }

  return value;
}

