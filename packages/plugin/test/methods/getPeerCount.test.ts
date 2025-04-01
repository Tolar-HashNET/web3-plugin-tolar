import type { core } from "web3";

import type { TolarExecutionAPI } from "../../src/rpc";
import { getPeerCount } from "../../src/rpc";

describe("Method getPeerCount Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager = {
    send: requestManagerSend,
  } as unknown as core.Web3RequestManager<TolarExecutionAPI>;

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("getPeerCount return", async () => {
    requestManagerSend.mockResolvedValue(8);

    const peerCount = await getPeerCount(requestManager);

    expect(peerCount).toEqual(8);
  });
});
