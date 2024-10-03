import type { core } from "web3";

import type { TolarExecutionAPI } from "../../src/rpc";
import { isMasterNode } from "../../src/rpc";

describe("Method isMasterNode Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager = {
    send: requestManagerSend,
  } as unknown as core.Web3RequestManager<TolarExecutionAPI>;

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("isMasterNode return", async () => {
    requestManagerSend.mockResolvedValue(true);

    const res = await isMasterNode(requestManager);

    expect(res).toEqual(true);
  });
});
