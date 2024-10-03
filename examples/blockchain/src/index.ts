import { Web3 } from "web3";
import { TolarPlugin } from "web3-plugin-tolar";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function main() {
  try {
    const web3 = new Web3("http://127.0.0.1:8200/jsonrpc");
    web3.registerPlugin(new TolarPlugin());

    const blockchainInfo = await web3.tolar.getBlockchainInfo();

    const block = await web3.tolar.getBlockByHash(
      blockchainInfo.lastConfirmedBlockHash,
    );
    for (const txHash of block.transactionHashes) {
      const tx = await web3.tolar.getTransaction(txHash);
      console.log(
        `Transaction ${tx.transactionHash} from last block has gas used: ${tx.gasUsed}`,
      );
      const senderBalance = await web3.tolar.getLatestBalance(tx.senderAddress);
      const receiverBalance = await web3.tolar.getLatestBalance(
        tx.receiverAddress,
      );
      console.log(
        `Sender ${tx.senderAddress} balance: ${senderBalance.balance.toString()}`,
      );
      console.log(
        `Receiver ${tx.receiverAddress} balance: ${receiverBalance.balance.toString()}`,
      );
    }
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
