import { hexToBytes } from "ethereum-cryptography/utils";
import type { Transaction, Bytes, HexString } from "web3";
import { validator, utils } from "web3";
import { privateKeyToPublicKey, uint8ArrayToBigInt } from "web3-eth-accounts";

import { privateKeyToAddress } from "./account";
import {
  toTolHexAddress,
  toTolHexAddressFromPublicKey,
  toEthAddress,
  toU256Proto,
  encodeToProto,
  decodeFromProto,
} from "./converters";
import type { Signature } from "./cryptography";
import { signHash, splitSignature } from "./cryptography";
import {
  Transaction as ProtoTransaction,
  SignatureData as ProtoSignatureData,
  SignedTransaction as ProtoSignedTransaction,
} from "./tolar_proto";
import { type AttoTol, type NetworkId } from "./types";
import { ZERO_HEX_ADDRESS } from "./types";
import {
  isPublicKeyValid,
  isTolAddressValid,
  isTolHashValid,
} from "./validation";

type FixedHashValidator = (val: Uint8Array | HexString) => string;

abstract class FixedHash {
  public readonly hexStr: HexString;

  protected constructor(
    value: Uint8Array | HexString,
    validator: FixedHashValidator,
  ) {
    const valid = validator(value);
    if (valid.length !== 0) {
      throw new Error(valid);
    }

    this.hexStr = typeof value === "string" ? value : utils.bytesToHex(value);
  }

  public equals(other: FixedHash): boolean {
    return this.hexStr === other.hexStr;
  }

  public encodeProto(): Uint8Array {
    return encodeToProto(this.hexStr);
  }
}

export class TolAddress extends FixedHash {
  public constructor(address: Uint8Array | HexString) {
    super(address, isTolAddressValid);
  }

  public static fromProto(protoValue: Uint8Array): TolAddress {
    return new TolAddress(decodeFromProto(protoValue));
  }

  public static fromEthAddress(ethAddress: HexString | Uint8Array): TolAddress {
    if (typeof ethAddress !== "string") {
      ethAddress = utils.bytesToHex(ethAddress);
    }

    return new TolAddress(toTolHexAddress(ethAddress));
  }

  public static fromPublicKey(publicKey: HexString): TolAddress {
    return new TolAddress(toTolHexAddressFromPublicKey(publicKey));
  }

  public toEthAddress(): HexString {
    return toEthAddress(this.hexStr);
  }

  public isZero(): boolean {
    return this.equals(ZERO_ADDRESS);
  }
}

export const ZERO_ADDRESS: TolAddress = new TolAddress(ZERO_HEX_ADDRESS);

export class TolHash extends FixedHash {
  public constructor(hash: Uint8Array | HexString) {
    super(hash, isTolHashValid);
  }

  public static fromData(data: Uint8Array | string): TolHash {
    return new TolHash(utils.sha3Raw(data));
  }

  public static fromProto(protoValue: Uint8Array): TolHash {
    return new TolHash(decodeFromProto(protoValue));
  }
}

export class TolPublicKey extends FixedHash {
  public constructor(publicKey: Uint8Array | HexString) {
    super(publicKey, isPublicKeyValid);
  }

  public static fromPrivateKey(privateKey: Bytes): TolPublicKey {
    return new TolPublicKey(privateKeyToPublicKey(privateKey, false));
  }

  public static fromProto(protoValue: Uint8Array): TolPublicKey {
    return new TolPublicKey(decodeFromProto(protoValue));
  }
}

export class TolTxBody {
  public readonly senderAddress: TolAddress;
  public readonly receiverAddress: TolAddress;
  public readonly value: AttoTol;
  public readonly gas: AttoTol;
  public readonly gasPrice: AttoTol;
  public readonly data: HexString;
  public readonly nonce: bigint;
  public readonly networkId: NetworkId;

  public constructor(
    senderAddress: TolAddress,
    receiverAddress: TolAddress,
    value: AttoTol,
    gas: AttoTol,
    gasPrice: AttoTol,
    data: string,
    nonce: bigint,
    networkId: NetworkId,
  ) {
    this.senderAddress = senderAddress;
    this.receiverAddress = receiverAddress;
    this.value = value;
    this.gas = gas;
    this.gasPrice = gasPrice;
    this.data = data;
    this.nonce = nonce;
    this.networkId = networkId;
  }

  public static fromTransaction(tx: Transaction): TolTxBody {
    if (validator.isNullish(tx.from)) {
      throw Error("Missing from field from transaction");
    }

    if (validator.isNullish(tx.value)) {
      throw Error("Transaction is missing value");
    }

    if (validator.isNullish(tx.nonce)) {
      throw Error("Transaction is missing nonce");
    }

    if (validator.isNullish(tx.networkId)) {
      throw Error("Transaction is missing networkId field");
    }

    const value = utils.toBigInt(tx.value);
    if (value < 0) {
      throw Error("Value must be greater than 0");
    }

    const gas = utils.toBigInt(tx.gas ?? tx.gasLimit ?? 21_000n);
    if (gas < 0) {
      throw Error("Gas must be greater than 0");
    }

    const gasPrice = utils.toBigInt(tx.gasPrice ?? 1n);
    if (gasPrice < 0) {
      throw Error("Gas price must be greater than 0");
    }

    const nonce = utils.toBigInt(tx.nonce);
    if (nonce < 0) {
      throw Error("Nonce must be greater than 0");
    }

    let data: HexString;
    if (validator.isNullish(tx.data) || tx.data.length === 0) {
      data = "";
    } else if (typeof tx.data !== "string") {
      throw new Error("Data must be string");
    } else {
      data = tx.data;
    }

    return new TolTxBody(
      new TolAddress(tx.from),
      new TolAddress(tx.to ?? "0x"),
      value,
      gas,
      gasPrice,
      data,
      nonce,
      Number(utils.toBigInt(tx.networkId)),
    );
  }

  public static fromProto(protoTxBody: ProtoTransaction): TolTxBody {
    return new TolTxBody(
      TolAddress.fromProto(protoTxBody.senderAddress),
      TolAddress.fromProto(protoTxBody.receiverAddress),
      uint8ArrayToBigInt(protoTxBody.value),
      uint8ArrayToBigInt(protoTxBody.gas),
      uint8ArrayToBigInt(protoTxBody.gasPrice),
      decodeFromProto(protoTxBody.data),
      uint8ArrayToBigInt(protoTxBody.nonce),
      Number(protoTxBody.networkId) as NetworkId,
    );
  }
}

export class TolTx {
  public readonly bodyHash: TolHash;
  public readonly signature: Signature;
  public readonly signerId: TolPublicKey;

  public readonly body: TolTxBody;

  public readonly rawSignedTx: HexString;
  public readonly hash: TolHash;

  private constructor(
    bodyHash: TolHash,
    signature: Signature,
    signerId: TolPublicKey,
    body: TolTxBody,
    rawSignedTx: HexString,
    hash: TolHash,
  ) {
    this.bodyHash = bodyHash;
    this.signature = signature;
    this.signerId = signerId;
    this.body = body;
    this.rawSignedTx = rawSignedTx;
    this.hash = hash;
  }

  public static fromTransaction(tx: Transaction, privateKey: Bytes): TolTx {
    if (validator.isNullish(tx.from)) {
      tx.from = privateKeyToAddress(privateKey);
    }

    return this.fromBody(TolTxBody.fromTransaction(tx), privateKey);
  }

  public static fromBody(txBody: TolTxBody, privateKey: Bytes): TolTx {
    const protoTxBody = ProtoTransaction.create({
      senderAddress: txBody.senderAddress.encodeProto(),
      receiverAddress: txBody.receiverAddress.encodeProto(),
      value: toU256Proto(txBody.value),
      gas: toU256Proto(txBody.gas),
      gasPrice: toU256Proto(txBody.gasPrice),
      data: hexToBytes(txBody.data),
      networkId: BigInt(txBody.networkId),
      nonce: toU256Proto(txBody.nonce),
    });

    const rawTxBody = ProtoTransaction.toBinary(protoTxBody);
    const bodyHash = TolHash.fromData(rawTxBody);

    const signature = signHash(bodyHash.hexStr, privateKey);
    const signerId = TolPublicKey.fromPrivateKey(privateKey);

    const protoSignatureData = ProtoSignatureData.create({
      hash: bodyHash.encodeProto(),
      signature: encodeToProto(signature.signature),
      signerId: signerId.encodeProto(),
    });

    const protoSignedTx = ProtoSignedTransaction.create({
      body: protoTxBody,
      sigData: protoSignatureData,
    });

    const rawSignedTx = utils.bytesToHex(
      ProtoSignedTransaction.toBinary(protoSignedTx),
    );
    const hash = TolHash.fromData(rawSignedTx);

    return new TolTx(bodyHash, signature, signerId, txBody, rawSignedTx, hash);
  }

  public static fromProto(txProto: ProtoSignedTransaction): TolTx {
    const sigData = txProto.sigData as ProtoSignatureData;

    const rawSignedTx = utils.bytesToHex(
      ProtoSignedTransaction.toBinary(txProto),
    );

    return new TolTx(
      TolHash.fromProto(sigData.hash),
      splitSignature(decodeFromProto(sigData.signature)),
      TolPublicKey.fromProto(sigData.signerId),
      TolTxBody.fromProto(txProto.body as ProtoTransaction),
      rawSignedTx,
      new TolHash(rawSignedTx),
    );
  }

  public static fromRaw(rawTx: HexString): TolTx {
    const protoTx = ProtoSignedTransaction.fromBinary(utils.hexToBytes(rawTx));
    return this.fromProto(protoTx);
  }
}
