import type { core } from "web3";

import type { TolarExecutionAPI } from "../../src/rpc";
import { getBalance } from "../../src/rpc";

describe("Method getBalance Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager = {
    send: requestManagerSend,
  } as unknown as core.Web3RequestManager<TolarExecutionAPI>;

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("getBalance return", async () => {
    requestManagerSend.mockResolvedValue({
      balance: "1000000000000000000",
      block_index: 48,
    });

    const balanceOutput = await getBalance(
      requestManager,
      "0x5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb",
      48,
    );

    expect(balanceOutput).toEqual({
      balance: 1000000000000000000n,
      blockIndex: 48,
    });
  });
});
