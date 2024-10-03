import { core } from "web3";

import { TolarPlugin } from "../src";

describe("TolarPlugin Tests", () => {
  it("should register TolarPlugin plugin on Web3Context instance", () => {
    const web3Context = new core.Web3Context("http://127.0.0.1:8545");
    web3Context.registerPlugin(new TolarPlugin());
    expect(web3Context.tolar).toBeDefined();
  });
});
