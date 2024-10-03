import {
  InvalidSignatureError,
  TransactionSigningError,
  UndefinedRawTransactionError,
  utils,
  validator,
} from "web3";
import type {
  Address,
  Bytes,
  CipherOptions,
  KeyStore,
  HexString,
  Transaction,
} from "web3";
import type {
  SignatureObject,
  SignResult,
  SignTransactionResult,
  Web3Account,
} from "web3-eth-accounts";
import {
  parseAndValidatePrivateKey,
  encrypt as ethEncrypt,
  privateKeyToAddress as ethPrivateKeyToAddress,
  decrypt as ethDecrypt,
} from "web3-eth-accounts";

import { toTolHexAddress } from "./converters";
import { secp256k1, signHash } from "./cryptography";
import { TolTx } from "./transaction";

export const hashMessage = (message: string): string => {
  return utils.sha3Raw(message);
};

export const sign = (data: string, privateKey: Bytes): SignResult => {
  const hash = hashMessage(data);
  const signature = signHash(hash, privateKey);

  return {
    message: data,
    messageHash: hash,
    v: utils.numberToHex(signature.v),
    r: signature.r,
    s: signature.s,
    signature: signature.signature,
  };
};

export const signTransaction = async (
  transaction: Transaction,
  privateKey: HexString,
  // eslint-disable-next-line @typescript-eslint/require-await
): Promise<SignTransactionResult> => {
  try {
    const tx = TolTx.fromTransaction(transaction, privateKey);

    return {
      messageHash: tx.bodyHash.hexStr, // tx body hash
      // tx body r, v, s
      v: `0x${tx.signature.v.toString(16)}`,
      r: tx.signature.r,
      s: tx.signature.s,
      rawTransaction: tx.rawSignedTx, // serialized signed transaction
      transactionHash: tx.hash.hexStr, // hash of serialized sign transaction
    };
  } catch (e: unknown) {
    let errorMsg: string;

    if (typeof e === "string") {
      errorMsg = e;
    } else if (e instanceof Error) {
      errorMsg = e.message;
    } else {
      errorMsg = "Unknown error happened during tolar transaction signing";
    }

    throw new TransactionSigningError(errorMsg);
  }
};

export const recoverTransaction = (rawTransaction: HexString): Address => {
  if (validator.isNullish(rawTransaction)) {
    throw new UndefinedRawTransactionError();
  }

  const tx = TolTx.fromRaw(rawTransaction);
  return tx.body.senderAddress.hexStr;
};

export const recover = (
  data: string | SignatureObject,
  signatureOrV?: string,
  prefixedOrR?: boolean | string,
  s?: string,
  prefixed?: boolean,
): Address => {
  if (typeof data === "object") {
    const signatureStr = `${data.r}${data.s.slice(2)}${data.v.slice(2)}`;
    return recover(data.messageHash, signatureStr, prefixedOrR);
  }
  if (
    typeof signatureOrV === "string" &&
    typeof prefixedOrR === "string" &&
    !utils.isNullish(s)
  ) {
    const signatureStr = `${prefixedOrR}${s.slice(2)}${signatureOrV.slice(2)}`;
    return recover(data, signatureStr, prefixed);
  }

  if (utils.isNullish(signatureOrV))
    throw new InvalidSignatureError("signature string undefined");

  const V_INDEX = 130; // r = first 32 bytes, s = second 32 bytes, v = last byte of signature
  const hashedMessage = prefixedOrR ? data : hashMessage(data);

  const v = parseInt(signatureOrV.substring(V_INDEX), 16); // 0x + r + s + v

  const ecPublicKey = secp256k1.Signature.fromCompact(
    signatureOrV.slice(2, V_INDEX),
  )
    .addRecoveryBit(v)
    .recoverPublicKey(hashedMessage.replace("0x", ""))
    .toRawBytes(false);

  const publicHash = utils.sha3Raw(ecPublicKey.subarray(1));

  return toTolHexAddress(`0x${publicHash.slice(-40)}`, false);
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
    signTransaction: (tx: Transaction) => {
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
