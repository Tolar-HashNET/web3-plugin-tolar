import { Web3 } from "web3";
import {
  TolarPlugin,
  NetworkId,
  account,
  TolTx,
  INVALID_NONCE,
} from "web3-plugin-tolar";

const web3 = new Web3("http://127.0.0.1:8200/jsonrpc");
web3.registerPlugin(new TolarPlugin());

// eslint-disable-next-line @typescript-eslint/no-misused-promises
window.addEventListener("load", async () => SendSignedTransaction(), false);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function SendSignedTransaction() {
  const senderPrivateKey =
    "0x67f3c68cedd11ef77ed6b92ca9fd82c699ccfc5f1fd96fa485b0ffeb2cf60fdf";
  const senderAddress = account.privateKeyToAddress(senderPrivateKey);
  const receiver = "0x54bae6ca49e556227d3e257f4ecc201588abd2b131035c68fa";

  let nonce = await web3.tolar.getNonce(senderAddress);
  if (nonce === INVALID_NONCE) {
    nonce = 0n;
  }

  const tx = TolTx.fromTransaction(
    {
      from: senderAddress,
      to: receiver,
      value: 1000000000000000000n,
      networkId: NetworkId.Local,
      nonce: nonce,
    },
    senderPrivateKey,
  );
  const txHash = await web3.tolar.sendSignedTransaction(tx.rawSignedTx);

  const divElement = document.createElement("div");
  divElement.innerText = `Transaction sent: ${txHash}`;

  const body = document.querySelector("body");
  if (body) {
    body.appendChild(divElement);
  }
}
