import type { core } from "web3";

import { NetworkId } from "../../src";
import type { TolarExecutionAPI } from "../../src/rpc";
import { getGasEstimate } from "../../src/rpc";

describe("Method getGasEstimate Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager = {
    send: requestManagerSend,
  } as unknown as core.Web3RequestManager<TolarExecutionAPI>;

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("getGasEstimate return", async () => {
    requestManagerSend.mockResolvedValue("21000");

    const estimate = await getGasEstimate(requestManager, {
      senderAddress: "0x5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb",
      receiverAddress: "0x5451ff8b773fa696128c4bf7af35b828cdf96b0c1fd83563ab",
      amount: 569000n,
      gas: 21000n,
      gasPrice: 1n,
      data: "",
      nonce: 7n,
      networkId: NetworkId.Local,
    });

    expect(estimate).toEqual(21000n);
  });
});
