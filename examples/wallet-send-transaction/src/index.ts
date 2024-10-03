import { retryDecorator } from "ts-retry-promise";
import { Web3 } from "web3";
import { TolarPlugin, NetworkId, type RpcTxResponse } from "web3-plugin-tolar";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function main() {
  try {
    const web3 = new Web3("http://127.0.0.1:8200/jsonrpc");
    web3.registerPlugin(new TolarPlugin());

    const retryGetTx = retryDecorator(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      (hash) => web3.tolar.getTransaction(hash),
      { timeout: 30_000, delay: 2000 },
    );
    const tolarWallet = web3.tolar.wallet!;

    tolarWallet.add(
      "0x67f3c68cedd11ef77ed6b92ca9fd82c699ccfc5f1fd96fa485b0ffeb2cf60fdf",
    );
    tolarWallet.add(
      "0x58ae019b967976b92d0624a370ff6573eedbcc2a6b49ea4fa694cfa760f69118",
    );

    const sender = tolarWallet[0].address;
    const receiver = tolarWallet[1].address;

    const transactionHash = await web3.tolar.sendTransaction({
      from: sender,
      to: receiver,
      value: 1000000000000000000n,
      networkId: NetworkId.Local,
    });
    const txResponse: RpcTxResponse = await retryGetTx(transactionHash);
    console.log(
      `Transaction with hash ${txResponse.transactionHash} is confirmed at block with hash ${txResponse.blockHash}`,
    );
  } catch (ex) {
    let message: string = "Unknown error";
    if (typeof ex === "string") {
      message = ex;
    } else if (ex instanceof Error) {
      message = ex.message;
    }

    console.error(message);
  }
}

void main();
