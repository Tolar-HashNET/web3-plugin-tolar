import type { core } from "web3";

import type { TolarExecutionAPI } from "../../src/rpc";
import { getMasterNodeCount } from "../../src/rpc";

describe("Method getMasterNodeCount Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager = {
    send: requestManagerSend,
  } as unknown as core.Web3RequestManager<TolarExecutionAPI>;

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("getMasterNodeCount return", async () => {
    requestManagerSend.mockResolvedValue(4);

    const masterNodeCount = await getMasterNodeCount(requestManager);

    expect(masterNodeCount).toEqual(4);
  });
});
