// import type { Transaction } from "web3";
//
// //import * as txProto from "./tolar-proto";
//
// import type { HexStringBytes } from "web3-types";
//
// import type { Address, AttoTol, NetworkId } from "./types";

//const tolarProto = txProto.tolar.proto;

/*
  Signature signature_;
  Hash hash_;
  PublicKey signer_id_;
  Address sender_;
  Address receiver_;
  AttoTolar value_;
  AttoTolar gas_;
  AttoTolar gas_price_;
  Bytes data_;
  Nonce nonce_;
  std::uint64_t network_id_;
 */

/*
        senderAddress: utfEncoder.encode('5412c347d6570bcdde3a89fca489f679b8b0ca22a5d4e3b6ca'),
        receiverAddress: utfEncoder.encode('549f86338b7967c20acfaf816b27ecdb4e87fe94355185c614'),
        value: toU256(1000003432),
        gas: toU256(210000),
        gasPrice: toU256(1000000000000),
        data: utfEncoder.encode('test data'),
        networkId: 3,
        nonce: toU256(1)
 */
// export type TolTxBody = {
//   senderAddress: Uint8Array;
//   receiverAddress: Uint8Array;
//   value: Uint8Array;
// };
//
// export class TolTx {
//   public readonly senderAddress: Address;
//   public readonly receiverAddress: Address;
//   public readonly value: AttoTol;
//   public readonly gas: AttoTol;
//   public readonly gasPrice: AttoTol;
//   public readonly data: Uint8Array;
//   public readonly nonce: bigint;
//   public readonly networkId: NetworkId;
//
//   private constructor(
//     senderAddress: Address,
//     receiverAddress: Address,
//     value: AttoTol,
//     gas: AttoTol,
//     gasPrice: AttoTol,
//     data: HexStringBytes,
//     nonce: bigint,
//     networkId: NetworkId,
//   ) {
//     this.senderAddress = senderAddress;
//     this.receiverAddress = receiverAddress;
//     this.value = value;
//     this.gas = gas;
//     this.gasPrice = gasPrice;
//     this.data = data;
//     this.nonce = nonce;
//     this.networkId = networkId;
//   }
//
//   public static fromTransaction(tx: Transaction): TolTx {}
// }
