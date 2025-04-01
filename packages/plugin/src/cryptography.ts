import * as ethereumCryptography from "ethereum-cryptography/secp256k1";
import { type Bytes, type HexString, utils } from "web3";
import { parseAndValidatePrivateKey } from "web3-eth-accounts";

import type { StrHexHash } from "./types";
import { isTolSignatureValid } from "./validation";

export const secp256k1 = ethereumCryptography.secp256k1 ?? ethereumCryptography;

export function calculateHash(data: Uint8Array | string): StrHexHash {
  const res = utils.sha3(data);
  if (res === undefined) {
    throw new Error("Failed to calculate hash");
  }

  return res;
}

export type Signature = {
  r: HexString;
  s: HexString;
  v: number;
  signature: HexString;
};

export function splitSignature(signature: HexString): Signature {
  const error = isTolSignatureValid(signature);
  if (error.length === 0) {
    throw new Error(error);
  }

  let offset = 2;

  return {
    r: signature.substring(offset, (offset += 64)),
    s: signature.substring(offset, (offset += 64)),
    v: Number(utils.hexToNumber(`0x${signature.substring(offset)}`)),
    signature: signature,
  };
}

export function signHash(hash: Bytes, privateKey: Bytes): Signature {
  const privateKeyUint8Array = parseAndValidatePrivateKey(privateKey);

  if (typeof hash === "string") {
    hash = utils.hexToBytes(hash);
  }

  const signature = secp256k1.sign(hash, privateKeyUint8Array);
  const signatureBytes = signature.toCompactRawBytes();
  const v = signature.recovery;

  return {
    v: v,
    r: `0x${signature.r.toString(16).padStart(64, "0")}`,
    s: `0x${signature.s.toString(16).padStart(64, "0")}`,
    signature: `${utils.bytesToHex(signatureBytes)}0${v.toString(16)}`,
  };
}
