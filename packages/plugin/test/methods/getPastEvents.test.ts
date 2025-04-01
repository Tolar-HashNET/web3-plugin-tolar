import type { core } from "web3";

import { getPastEvents } from "../../src/rpc";
import type { TolarExecutionAPI } from "../../src/rpc";

describe("Method getPastEvents Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager = {
    send: requestManagerSend,
  } as unknown as core.Web3RequestManager<TolarExecutionAPI>;

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("getPastEvents return", async () => {
    requestManagerSend.mockResolvedValue({
      past_events: [
        {
          address: "5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb",
          topic:
            "0d13800e76908f21833df64e9bc413caf783ec15c3453f1e5f7666187a326928",
          topic_arg_0:
            "0000000000000000000000000000000000000000000000000000000000000000",
          topic_arg_1:
            "0000000000000000000000000000000000000000000000000000000000000000",
          topic_arg_2:
            "00000000000000000000000034dcc69921b8bacf14017b4289820150a4a42aaa",
          data: "74686973206973206669727374206c617374206576656e74",
          transaction_hash:
            "3114c475957d5353ef70715336c5bf4c25e250287f2d79a34a1a4d03414643dd",
          block_hash:
            "0d928eeb95baa6ce0ad292b3dc0f0b050ae0429cc8da1af906658f1bc2072106",
          block_index: 12345,
        },
        {
          address: "5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb",
          topic:
            "0d13800e76908f21833df64e9bc413caf783ec15c3453f1e5f7666187a326928",
          topic_arg_0:
            "0000000000000000000000000000000000000000000000000000000000000000",
          topic_arg_1:
            "00000000000000000000000034dcc69921b8bacf14017b4289820150a4a42aa6",
          data: "74686973206973207365636f6e64206c617374206576656e74",
          transaction_hash:
            "3114c475957d5353ef70715336c5bf4c25e250287f2d79a34a1a4d0341464333",
          block_hash:
            "0d928eeb95baa6ce0ad292b3dc0f0b050ae0429cc8da1af906658f1bc2072106",
          block_index: 12345,
        },
      ],
    });

    const pastEvents = await getPastEvents(
      requestManager,
      "0x5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb",
      "0x0d13800e76908f21833df64e9bc413caf783ec15c3453f1e5f7666187a326928",
    );

    expect(pastEvents).toEqual([
      {
        address: "0x5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb",
        topic:
          "0x0d13800e76908f21833df64e9bc413caf783ec15c3453f1e5f7666187a326928",
        topicArg0:
          "0x0000000000000000000000000000000000000000000000000000000000000000",
        topicArg1:
          "0x0000000000000000000000000000000000000000000000000000000000000000",
        topicArg2:
          "0x00000000000000000000000034dcc69921b8bacf14017b4289820150a4a42aaa",
        data: "0x74686973206973206669727374206c617374206576656e74",
        transactionHash:
          "0x3114c475957d5353ef70715336c5bf4c25e250287f2d79a34a1a4d03414643dd",
        blockHash:
          "0x0d928eeb95baa6ce0ad292b3dc0f0b050ae0429cc8da1af906658f1bc2072106",
        blockIndex: 12345,
      },
      {
        address: "0x5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb",
        topic:
          "0x0d13800e76908f21833df64e9bc413caf783ec15c3453f1e5f7666187a326928",
        topicArg0:
          "0x0000000000000000000000000000000000000000000000000000000000000000",
        topicArg1:
          "0x00000000000000000000000034dcc69921b8bacf14017b4289820150a4a42aa6",
        topicArg2: "0x",
        data: "0x74686973206973207365636f6e64206c617374206576656e74",
        transactionHash:
          "0x3114c475957d5353ef70715336c5bf4c25e250287f2d79a34a1a4d0341464333",
        blockHash:
          "0x0d928eeb95baa6ce0ad292b3dc0f0b050ae0429cc8da1af906658f1bc2072106",
        blockIndex: 12345,
      },
    ]);
  });
});
