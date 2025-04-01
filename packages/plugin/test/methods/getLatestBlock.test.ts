import type { core } from "web3";

import type { TolarExecutionAPI } from "../../src/rpc";
import { getLatestBlock } from "../../src/rpc";

describe("Method getLatestBlock Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager = {
    send: requestManagerSend,
  } as unknown as core.Web3RequestManager<TolarExecutionAPI>;

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("getLatestBlock return", async () => {
    requestManagerSend.mockResolvedValue({
      block_index: 8,
      block_hash:
        "998666a2af4e03f941799a778550d217eb021a0e3daf35eedec5cc2a477a6b3b",
      confirmation_timestamp: 1652192733280,
      previous_block_hash:
        "93811a9bdbb846eedfc8f698b141c4de499cfb3d5359a6a1f312c59b21e121c4",
      transaction_hashes: [
        "5ab70e032db7303b1de31147602970098c21c75904e7281e89cde960d5ede1d1",
        "1c053382aedf362907ea42a6953c8d3684ec9abcb8769439222a4cd3219b678f",
        "fc6c8864f19c47505b8f49702cf051953e06a07096860faa82718ae95ce69b55",
      ],
    });

    const latestBlock = await getLatestBlock(requestManager);
    expect(latestBlock).toEqual({
      blockIndex: 8,
      blockHash:
        "0x998666a2af4e03f941799a778550d217eb021a0e3daf35eedec5cc2a477a6b3b",
      confirmationTimestamp: new Date(1652192733280),
      previousBlockHash:
        "0x93811a9bdbb846eedfc8f698b141c4de499cfb3d5359a6a1f312c59b21e121c4",
      transactionHashes: [
        "0x5ab70e032db7303b1de31147602970098c21c75904e7281e89cde960d5ede1d1",
        "0x1c053382aedf362907ea42a6953c8d3684ec9abcb8769439222a4cd3219b678f",
        "0xfc6c8864f19c47505b8f49702cf051953e06a07096860faa82718ae95ce69b55",
      ],
    });
  });
});
