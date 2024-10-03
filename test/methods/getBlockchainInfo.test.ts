import type { core } from "web3";

import { getBlockchainInfo } from "../../src/rpc";
import type { TolarExecutionAPI } from "../../src/rpc";

describe("Method getBlockchainInfo Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager = {
    send: requestManagerSend,
  } as unknown as core.Web3RequestManager<TolarExecutionAPI>;

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("getBlockchainInfo return", async () => {
    requestManagerSend.mockResolvedValue({
      confirmed_blocks_count: 100,
      total_blocks_count: 100,
      last_confirmed_block_hash:
        "0d928eeb95baa6ce0ad292b3dc0f0b050ae0429cc8da1af906658f1bc2072106",
    });

    const blockchainInfo = await getBlockchainInfo(requestManager);

    expect(blockchainInfo).toEqual({
      confirmedBlocksCount: 100,
      totalBlocksCount: 100,
      lastConfirmedBlockHash:
        "0x0d928eeb95baa6ce0ad292b3dc0f0b050ae0429cc8da1af906658f1bc2072106",
    });
  });
});
