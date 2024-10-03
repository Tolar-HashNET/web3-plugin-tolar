# Tolar Smart Contract
This example shows how to deploy and execute method on smart contract

## Overview
Short overview of example:
1. Prerequisites
2. Build example
3. Registering the Tolar plugin with a web3.js instance
4. Define smart contract
5. Estimate gas
6. Deploy contract
7. Execute contract method
8. Obtain multiplication result

### Step 1: Prerequisites
- [NodeJS](https://nodejs.org/) (LTS/Iron)
- [npm](https://www.npmjs.com/package/npm/v/10.8.2)
- [web3js 4.0 or higher](https://www.npmjs.com/package/web3)

### Step 2: Build example
```bash
# Install
npm install
# Build
npm run build
# Run
npm run dev
```

### Step 3: Registering the Tolar plugin with a web3.js instance
First, we create a web3js object and set the provider to the local Tolar Hashnet network.\
The next step is to register the Tolar Hashnet plugin in accordance with the web3JS plugin [guide](https://docs.web3js.org/guides/web3_plugin_guide/plugin_users).
```typescript
const web3 = new Web3("http://127.0.0.1:8200/jsonrpc");
web3.registerPlugin(new TolarPlugin());
```

### Step 4: Define smart contract
To deploy and execute solidity smart contract we need to first compile it. In this example we use `solc` in version `0.5.14+commit.01f1aaa4.Linux.g++`.\
Example of contract compilation:
```bash
solc --evm-version istanbul --abi --bin --overwrite --output-dir . multiply.sol
```
Contract binary code is stored in `CONTRACT_BIN` variable and contract abi is stored in `CONTRACT_ABI` constants.

### Step 5: Estimate gas
To get gas estimation we need create `RpcTxRequest` object and call `getGasEstimate` method.
```typescript
const contractTxRequest: RpcTxRequest = {
    senderAddress: senderAddress,
    receiverAddress: ZERO_HEX_ADDRESS,
    amount: 0n,
    networkId: NetworkId.Local,
    nonce: nonce,
    data: CONTRACT_BIN,
    gas: 53_000n,
    gasPrice: 1n
};

const gasEstimate = await web3.tolar.getGasEstimate(contractTxRequest);
```

### Step 6: Deploy contract
Contract is deployed by sending transaction with data field set to contract binary and receiver address to zero address.
```typescript
const txDeployHash = await web3.tolar.sendTransaction({
    from: contractTxRequest.senderAddress,
    to: ZERO_HEX_ADDRESS,
    value: contractTxRequest.amount,
    networkId: contractTxRequest.networkId,
    nonce: nonce,
    data: CONTRACT_BIN,
    gas: gasEstimate,
    gasPrice: contractTxRequest.gasPrice,
});
```

### Step 7: Execute contract method
To call contract `execute` method with parameter `10` we need encode method call using contract abi and parameter using web3js function `encodeFunctionCall`.
```typescript
const txExecuteMultiplyHash = await web3.tolar.sendTransaction({
    from: senderAddress,
    to: txDeployResponse.newAddress,
    value: 0n,
    networkId: contractTxRequest.networkId,
    nonce: ++nonce,
    data: web3.eth.abi.encodeFunctionCall(execMethodAbi, [10]),
    gas: 25_000n,
    gasPrice: 1n,
});
```

### Step 8: Obtain multiplication result
Result of method execution is stored in output field of executed transaction.
```typescript
const txExecuteMultiplyResponse: RpcTxResponse = await retryGetTx(txExecuteMultiplyHash);
```
The result is decoded as follows:
```typescript
const result = web3.eth.abi.decodeParameter(execMethodAbi.outputs[0].type, txExecuteMultiplyResponse.output) as bigint;
```
