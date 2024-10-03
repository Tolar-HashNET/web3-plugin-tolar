import type { core } from "web3";

import { NetworkId } from "../../src";
import type { TolarExecutionAPI } from "../../src/rpc";
import { tryCallTransaction } from "../../src/rpc";

describe("Method tryCallTransaction Tests", () => {
  const requestManagerSend = jest.fn();
  const requestManager = {
    send: requestManagerSend,
  } as unknown as core.Web3RequestManager<TolarExecutionAPI>;

  beforeEach(() => {
    requestManagerSend.mockClear();
  });

  it("tryCallTransaction return", async () => {
    requestManagerSend.mockResolvedValue({
      output: "31ab5678",
      excepted: true,
    });

    const tryCallOutput = await tryCallTransaction(requestManager, {
      senderAddress: "0x5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb",
      receiverAddress: "0x5451ff8b773fa696128c4bf7af35b828cdf96b0c1fd83563ab",
      amount: 569000n,
      gas: 21000n,
      gasPrice: 1n,
      data: "0xcfae3217c5b262aa",
      nonce: 7n,
      networkId: NetworkId.Local,
    });

    expect(tryCallOutput).toEqual({
      output: "0x31ab5678",
      excepted: true,
    });
  });
});
