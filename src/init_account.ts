import { validator, utils, ETH_DATA_FORMAT } from "web3";
import type { Transaction, Web3Context, KeyStore, Bytes } from "web3";
import {
  parseAndValidatePrivateKey,
  privateKeyToPublicKey,
  type SignTransactionResult,
  Wallet,
  type Web3Account,
} from "web3-eth-accounts";

import {
  privateKeyToAddress,
  signTransaction,
  privateKeyToAccount,
  decrypt,
  create,
  recoverTransaction,
  hashMessage,
  sign,
  recover,
  encrypt,
} from "./account";
import type { TolarExecutionAPI } from "./rpc";
import { INVALID_NONCE } from "./types";

async function populateTx(
  tx: Transaction,
  privateKey: Bytes,
  context: Web3Context<TolarExecutionAPI>,
): Promise<Transaction> {
  const populatedTx = tx;

  if (validator.isNullish(populatedTx.from)) {
    populatedTx.from = privateKeyToAddress(privateKey);
  }

  if (validator.isNullish(populatedTx.nonce)) {
    populatedTx.nonce = await context.tolar.getNonce(populatedTx.from);
    if (populatedTx.nonce === INVALID_NONCE) {
      populatedTx.nonce = 0;
    }
  }

  if (validator.isNullish(populatedTx.value)) {
    populatedTx.value = "0x0";
  }

  if (validator.isNullish(populatedTx.networkId)) {
    // add rpc call for getting networkId
    if (!validator.isNullish(context.defaultNetworkId)) {
      populatedTx.networkId = context.defaultNetworkId;
    }
  }

  return populatedTx;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const initAccounts = (context: Web3Context<TolarExecutionAPI>) => {
  const signTransactionWithContext = async (
    transaction: Transaction,
    privateKey: Bytes,
  ): Promise<SignTransactionResult> => {
    const privateKeyHex = utils.format(
      { format: "bytes" },
      privateKey,
      ETH_DATA_FORMAT,
    );
    const tx = await populateTx(transaction, privateKey, context);

    return signTransaction(tx, privateKeyHex);
  };

  const privateKeyToAccountWithContext = (
    privateKey: Uint8Array | string,
  ): Web3Account => {
    const account = privateKeyToAccount(privateKey);

    return {
      ...account,
      signTransaction: async (transaction: Transaction) =>
        signTransactionWithContext(transaction, account.privateKey),
    };
  };

  const decryptWithContext = async (
    keystore: KeyStore | string,
    password: string,
    options?: Record<string, unknown>,
  ): Promise<Web3Account> => {
    const account = await decrypt(
      keystore,
      password,
      (options?.nonStrict as boolean) ?? true,
    );

    return {
      ...account,
      signTransaction: async (transaction: Transaction) =>
        signTransactionWithContext(transaction, account.privateKey),
    };
  };

  const createWithContext = (): Web3Account => {
    const account = create();

    return {
      ...account,
      signTransaction: async (transaction: Transaction) =>
        signTransactionWithContext(transaction, account.privateKey),
    };
  };

  const wallet = new Wallet({
    create: createWithContext,
    privateKeyToAccount: privateKeyToAccountWithContext,
    decrypt: decryptWithContext,
  });

  return {
    signTransaction: signTransactionWithContext,
    create: createWithContext,
    privateKeyToAccount: privateKeyToAccountWithContext,
    decrypt: decryptWithContext,
    recoverTransaction,
    hashMessage,
    sign,
    recover,
    encrypt,
    wallet,
    privateKeyToAddress,
    parseAndValidatePrivateKey,
    privateKeyToPublicKey,
  };
};
