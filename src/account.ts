import * as ethereumCryptography from "ethereum-cryptography/secp256k1.js";
import { TransactionSigningError, utils, validator } from "web3";
import type {
  Bytes,
  CipherOptions,
  KeyStore,
  HexString,
  Transaction,
} from "web3";
import type {
  SignResult,
  SignTransactionResult,
  Web3Account,
} from "web3-eth-accounts";
import {
  parseAndValidatePrivateKey as ethParseAndValidatePrivateKey,
  encrypt as ethEncrypt,
  privateKeyToAddress as ethPrivateKeyToAddress,
  decrypt as ethDecrypt,
  privateKeyToAccount as ethPrivateKeyToAccount,
} from "web3-eth-accounts";

import { toTolHexAddress } from "./utils";

const secp256k1 = ethereumCryptography.secp256k1 ?? ethereumCryptography;

export interface TolarAccount {
  account: Web3Account;
}

export const parseAndValidatePrivateKey = ethParseAndValidatePrivateKey;

export const hashMessage = (message: string): string => {
  const messageHex = validator.isHexStrict(message)
    ? message
    : utils.utf8ToHex(message);

  return utils.sha3Raw(utils.hexToBytes(messageHex));
};

export const sign = (data: string, privateKey: Bytes): SignResult => {
  const privateKeyUint8Array = parseAndValidatePrivateKey(privateKey);

  const hash = hashMessage(data);

  const signature = secp256k1.sign(hash.substring(2), privateKeyUint8Array);
  const signatureBytes = signature.toCompactRawBytes();
  const r = signature.r.toString(16).padStart(64, "0");
  const s = signature.s.toString(16).padStart(64, "0");
  const v = signature.recovery + 27;

  return {
    message: data,
    messageHash: hash,
    v: utils.numberToHex(v),
    r: `0x${r}`,
    s: `0x${s}`,
    signature: `${utils.bytesToHex(signatureBytes)}${v.toString(16)}`,
  };
};

export const signTransaction = async (
  _transaction: Transaction,
  privateKey: HexString,
  // eslint-disable-next-line @typescript-eslint/require-await
): Promise<SignTransactionResult> => {
  // const signedTx = transaction.sign(hexToBytes(privateKey));
  // if (isNullish(signedTx.v) || isNullish(signedTx.r) || isNullish(signedTx.s))
  //   throw new TransactionSigningError("Signer Error");
  //
  // const validationErrors = signedTx.validate(true);
  //
  // if (validationErrors.length > 0) {
  //   let errorString = "Signer Error ";
  //   for (const validationError of validationErrors) {
  //     errorString += `${errorString} ${validationError}.`;
  //   }
  //   throw new TransactionSigningError(errorString);
  // }
  //
  // const rawTx = bytesToHex(signedTx.serialize());
  // const txHash = sha3Raw(rawTx); // using keccak in web3-utils.sha3Raw instead of SHA3 (NIST Standard) as both are different
  //
  // return {
  //   messageHash: bytesToHex(signedTx.getMessageToSign(true)),
  //   v: `0x${signedTx.v.toString(16)}`,
  //   r: `0x${signedTx.r.toString(16).padStart(64, "0")}`,
  //   s: `0x${signedTx.s.toString(16).padStart(64, "0")}`,
  //   rawTransaction: rawTx,
  //   transactionHash: bytesToHex(txHash),
  // };
  //console.log(`tx: ${transaction.value.toString()}`);
  console.log(`privateKey: ${privateKey}`);

  return {
    messageHash: "kurcina",
    v: "",
    r: "",
    s: "",
    rawTransaction: "",
    transactionHash: "",
  };
};

export const privateKeyToAddress = (privateKey: Bytes): string => {
  return toTolHexAddress(ethPrivateKeyToAddress(privateKey));
};

export const encrypt = async (
  privateKey: Bytes,
  password: string | Uint8Array,
  options?: CipherOptions,
): Promise<KeyStore> => {
  const keyStore = await ethEncrypt(privateKey, password, options);
  keyStore.address = toTolHexAddress(keyStore.address);

  return keyStore;
};

export const privateKeyToAccount = (
  privateKey: Bytes,
  ignoreLength?: boolean,
): Web3Account => {
  const privateKeyUint8Array = parseAndValidatePrivateKey(
    privateKey,
    ignoreLength,
  );

  return {
    address: privateKeyToAddress(privateKeyUint8Array),
    privateKey: utils.bytesToHex(privateKeyUint8Array),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    signTransaction: (_tx: Transaction) => {
      throw new TransactionSigningError("Not implemented");
    },
    sign: (data: Record<string, unknown> | string) =>
      sign(
        typeof data === "string" ? data : JSON.stringify(data),
        privateKeyUint8Array,
      ),
    encrypt: async (password: string, options?: Record<string, unknown>) =>
      encrypt(privateKeyUint8Array, password, options),
  };
};

export const create = (): Web3Account => {
  const privateKey = secp256k1.utils.randomPrivateKey();
  return privateKeyToAccount(`${utils.bytesToHex(privateKey)}`);
};

export const decrypt = async (
  keystore: KeyStore | string,
  password: string | Uint8Array,
  nonStrict?: boolean,
): Promise<Web3Account> => {
  const ethAccount = await ethDecrypt(keystore, password, nonStrict);
  return privateKeyToAccount(ethAccount.privateKey);
};

export const privateKeyToPublicKey = ethPrivateKeyToAccount;
