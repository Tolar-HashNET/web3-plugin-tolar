import type { core } from "web3";

import { getTransaction } from "../../src/rpc";
import type { TolarExecutionAPI } from "../../src/rpc";

describe("Method getTransaction Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager = {
    send: requestManagerSend,
  } as unknown as core.Web3RequestManager<TolarExecutionAPI>;

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("getTransaction return", async () => {
    requestManagerSend.mockResolvedValue({
      transaction_hash:
        "5ab70e032db7303b1de31147602970098c21c75904e7281e89cde960d5ede1d1",
      block_hash:
        "998666a2af4e03f941799a778550d217eb021a0e3daf35eedec5cc2a477a6b3b",
      transaction_index: 1,
      sender_address: "5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb",
      receiver_address: "5451ff8b773fa696128c4bf7af35b828cdf96b0c1fd83563ab",
      value: "569000",
      gas: "21000",
      gas_price: "1",
      data: "",
      nonce: "7",
      network_id: 1,
      confirmation_timestamp: 1652192733280,
      gas_used: "21000",
      gas_refunded: "0",
      new_address: "",
      output: "",
      excepted: false,
      exception: 0,
    });

    const txResponse = await getTransaction(
      requestManager,
      "0x5ab70e032db7303b1de31147602970098c21c75904e7281e89cde960d5ede1d1",
    );

    expect(txResponse).toEqual({
      transactionHash:
        "0x5ab70e032db7303b1de31147602970098c21c75904e7281e89cde960d5ede1d1",
      blockHash:
        "0x998666a2af4e03f941799a778550d217eb021a0e3daf35eedec5cc2a477a6b3b",
      transactionIndex: 1,
      senderAddress: "0x5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb",
      receiverAddress: "0x5451ff8b773fa696128c4bf7af35b828cdf96b0c1fd83563ab",
      value: 569000n,
      gas: 21000n,
      gasPrice: 1n,
      data: "0x",
      nonce: 7n,
      networkId: 1,
      confirmationTimestamp: new Date(1652192733280),
      gasUsed: 21000n,
      gasRefunded: 0n,
      newAddress: "0x",
      output: "0x",
      excepted: false,
      exception: 0,
    });
  });
});
