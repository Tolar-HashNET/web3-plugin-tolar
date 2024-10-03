# Tolar Send Signed Transaction 
This example aims to demonstrate how to send a simple transaction that is manually signed.

## Overview
Short overview of example:
1. Prerequisites
2. Build example
3. Registering the Tolar plugin with a web3.js instance
4. Get nonce
5. Send transaction

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

### Step 4: Get nonce
Nonce is obtained by calling Tolar specific getNonce method. Nonce returns an INVALID_NONCE value for genesis addresses that are used for the first time.
```typescript
let nonce = await web3.tolar.getNonce(senderAddress);
if(nonce === INVALID_NONCE) {
    nonce = 0n;
}
```

### Step 5: Send transaction
First, we create a transaction object called `TolTx` that sets all provided transaction fields, serializes and signs the transaction date.\
Tolar transactions are serialized using protocol buffer format, and then the resulting binary data is converted to a hex string.
```typescript
const tx = TolTx.fromTransaction(
    {from: senderAddress, to: receiver, value: 1000000000000000000n, networkId: NetworkId.Local, nonce: nonce},
    senderPrivateKey
);
const txHash = await web3.tolar.sendSignedTransaction(tx.rawSignedTx);
```
