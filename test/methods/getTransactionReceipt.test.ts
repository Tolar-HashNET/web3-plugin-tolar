import type { core } from "web3";

import { getTransactionReceipt } from "../../src/rpc";
import type { TolarExecutionAPI } from "../../src/rpc";

describe("Method getTransactionReceipt Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager = {
    send: requestManagerSend,
  } as unknown as core.Web3RequestManager<TolarExecutionAPI>;

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("getTransactionReceipt return", async () => {
    requestManagerSend.mockResolvedValue({
      excepted: false,
      block_hash:
        "998666a2af4e03f941799a778550d217eb021a0e3daf35eedec5cc2a477a6b3b",
      block_index: 23,
      transaction_hash:
        "5ab70e032db7303b1de31147602970098c21c75904e7281e89cde960d5ede1d1",
      transaction_index: 1,
      sender_address: "5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb",
      receiver_address: "5456a09d5c06e23ec6a71a7db606549ec4bde1788c71a9552b",
      new_address: "54000000000000000000000000000000000000000023199e2b",
      gas_used: "21000",
      logs: [
        {
          address: "5456a09d5c06e23ec6a71a7db606549ec4bde1788c71a9552b",
          topics: [
            "324591e46c0cd422e42a223fbdaf9117beefd35b5f20a2b908afff711bd55bee",
            "00000000000000000000000012c347d6570bcdde3a89fca489f679b8b0ca22a5",
            "0000000000000000000000000000000000000000000000000000000000000008",
          ],
          data: "000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000056578747261000000000000000000000000000000000000000000000000000000",
        },
      ],
      exception: 0,
    });

    const pastEvents = await getTransactionReceipt(
      requestManager,
      "0x5ab70e032db7303b1de31147602970098c21c75904e7281e89cde960d5ede1d1",
    );

    expect(pastEvents).toEqual({
      excepted: false,
      blockHash:
        "0x998666a2af4e03f941799a778550d217eb021a0e3daf35eedec5cc2a477a6b3b",
      blockIndex: 23,
      transactionHash:
        "0x5ab70e032db7303b1de31147602970098c21c75904e7281e89cde960d5ede1d1",
      transactionIndex: 1,
      senderAddress: "0x5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb",
      receiverAddress: "0x5456a09d5c06e23ec6a71a7db606549ec4bde1788c71a9552b",
      newAddress: "0x54000000000000000000000000000000000000000023199e2b",
      gasUsed: 21000n,
      logs: [
        {
          address: "0x5456a09d5c06e23ec6a71a7db606549ec4bde1788c71a9552b",
          topics: [
            "0x324591e46c0cd422e42a223fbdaf9117beefd35b5f20a2b908afff711bd55bee",
            "0x00000000000000000000000012c347d6570bcdde3a89fca489f679b8b0ca22a5",
            "0x0000000000000000000000000000000000000000000000000000000000000008",
          ],
          data: "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000056578747261000000000000000000000000000000000000000000000000000000",
        },
      ],
      exception: 0,
    });
  });
});
