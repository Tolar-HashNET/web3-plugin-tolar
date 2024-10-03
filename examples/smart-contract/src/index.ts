import { retryDecorator } from "ts-retry-promise";
import { Web3 } from "web3";
import {
  TolarPlugin,
  NetworkId,
  type RpcTxRequest,
  INVALID_NONCE,
  ZERO_HEX_ADDRESS,
} from "web3-plugin-tolar";
import type { RpcTxResponse } from "web3-plugin-tolar/src/types";

/*
pragma solidity ^0.5.14;

contract MultiplyBySeven {
    function execute(uint a) public pure returns(uint d) { return a * 7; }
}
 */
const CONTRACT_ABI = [
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "a",
        type: "uint256",
      },
    ],
    name: "execute",
    outputs: [
      {
        internalType: "uint256",
        name: "d",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "pure",
    type: "function",
  },
];

const CONTRACT_BIN =
  "0x6080604052348015600f57600080fd5b5060ae8061001e6000396000f3fe6080604052348015600f57600080fd5b5" +
  "06004361060285760003560e01c8063fe0d94c114602d575b600080fd5b605660048036036020811015604157600080fd5b8101908080359" +
  "060200190929190505050606c565b6040518082815260200191505060405180910390f35b600060078202905091905056fea265627a7a723" +
  "15820e8013150f3377b0065518c7d4aa7a67637feb37ddf06a4182edb72bc5bd1c46364736f6c634300050e0032";

const web3 = new Web3("http://127.0.0.1:8200/jsonrpc");
web3.registerPlugin(new TolarPlugin());
const retryGetTx = retryDecorator(
  (txHash) => web3.tolar.getTransaction(txHash),
  { timeout: 30_000, delay: 2000 },
);

web3.tolar.wallet!.add(
  "0x67f3c68cedd11ef77ed6b92ca9fd82c699ccfc5f1fd96fa485b0ffeb2cf60fdf",
);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
window.addEventListener("load", async () => SendSignedTransaction(), false);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function SendSignedTransaction() {
  const senderAddress = web3.tolar.wallet![0].address;

  let nonce = await web3.tolar.getNonce(senderAddress);
  if (nonce === INVALID_NONCE) {
    nonce = 0n;
  }

  const contractTxRequest: RpcTxRequest = {
    senderAddress: senderAddress,
    receiverAddress: ZERO_HEX_ADDRESS,
    amount: 0n,
    networkId: NetworkId.Local,
    nonce: nonce,
    data: CONTRACT_BIN,
    gas: 53_000n,
    gasPrice: 1n,
  };

  const gasEstimate = await web3.tolar.getGasEstimate(contractTxRequest);

  const txDeployHash = await web3.tolar.sendTransaction({
    from: contractTxRequest.senderAddress,
    to: ZERO_HEX_ADDRESS,
    value: contractTxRequest.amount,
    networkId: contractTxRequest.networkId,
    nonce: nonce,
    data: CONTRACT_BIN,
    gas: gasEstimate,
    gasPrice: contractTxRequest.gasPrice,
  });

  const txDeployResponse: RpcTxResponse = await retryGetTx(txDeployHash);
  if (txDeployResponse.excepted) {
    console.error(
      `Failed to deploy contract with error code: ${txDeployResponse.exception}`,
    );
    return;
  }

  const execMethodAbi = CONTRACT_ABI[0];

  const txExecuteMultiplyHash = await web3.tolar.sendTransaction({
    from: senderAddress,
    to: txDeployResponse.newAddress,
    value: 0n,
    networkId: contractTxRequest.networkId,
    nonce: ++nonce,
    data: web3.eth.abi.encodeFunctionCall(execMethodAbi, [10]),
    gas: 25_000n,
    gasPrice: 1n,
  });

  const txExecuteMultiplyResponse: RpcTxResponse = await retryGetTx(
    txExecuteMultiplyHash,
  );
  if (txExecuteMultiplyResponse.excepted) {
    console.error(
      `Failed to execute contract method with error: ${txExecuteMultiplyResponse.exception}`,
    );
    return;
  }

  const result = web3.eth.abi.decodeParameter(
    execMethodAbi.outputs[0].type,
    txExecuteMultiplyResponse.output,
  ) as bigint;

  const divElement = document.createElement("div");
  divElement.innerText = `Multiplication result: ${result.toString()}`;

  const body = document.querySelector("body");
  if (body) {
    body.appendChild(divElement);
  }
}
