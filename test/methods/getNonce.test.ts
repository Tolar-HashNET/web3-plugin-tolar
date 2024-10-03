import type { core } from "web3";

import { getNonce } from "../../src/rpc";
import type { TolarExecutionAPI } from "../../src/rpc";

describe("Method getNonce Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager = {
    send: requestManagerSend,
  } as unknown as core.Web3RequestManager<TolarExecutionAPI>;

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("getNonce return", async () => {
    requestManagerSend.mockResolvedValue("2");

    const nonce = await getNonce(
      requestManager,
      "0x546399121770646811e854d5393e0236e24721b80325050e12",
    );

    expect(nonce).toEqual(2n);
  });
});
