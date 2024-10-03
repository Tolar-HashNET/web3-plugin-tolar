import type { core } from "web3";

import type { TolarExecutionAPI } from "../../src/rpc";
import { getBlockCount } from "../../src/rpc";

describe("Method getBlockCount Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager = {
    send: requestManagerSend,
  } as unknown as core.Web3RequestManager<TolarExecutionAPI>;

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("getBlockCount return", async () => {
    const expectedBlockCount = 100;
    requestManagerSend.mockResolvedValue(expectedBlockCount);

    const blockCount = await getBlockCount(requestManager);
    expect(blockCount).toBe(expectedBlockCount);
  });
});
