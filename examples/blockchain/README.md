# Tolar Blockchain
The purpose of this example is to demonstrate usage of basic blockchain methods.  

## Overview
Short overview of example:
1. Prerequisites
2. Build example
3. Registering the Tolar plugin with a web3.js instance
4. Getting blockchain information
5. Getting block
6. Getting transaction in block

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

### Step 4: Getting blockchain information
To get information about blockchain we call `getBlockchainInfo` method. Method returns hash of last block and total number of blocks.
```typescript
const blockchainInfo = await web3.tolar.getBlockchainInfo();
```
With possible result:
```typescript
console.log(JSON.stringify(blockchainInfo));
```
```
> {"lastConfirmedBlockHash":"0x0cf69aab323c999667b6046b24bceb03b26f836b1ebc471e0f849936416ee493","totalBlocksCount":430,"confirmedBlocksCount":430}
```

### Step 5: Getting block
Blocks can be obtained by the hash or index of the block. Start block index is 1. In this example we obtain last block by using value from `lastConfirmedBlockHash` field.\
More convenient way will be by using `getLatestBlock` method.
```typescript
const block = await web3.tolar.getBlockByHash(blockchainInfo.lastConfirmedBlockHash);
```

### Step 6: Getting transaction in block
The block object contains field `transactionHashes`, which is an array containing transaction hashes.\
We iterate it to obtain transactions using the `getTransaction` method. The `getLatestBalance` method is used to obtain the balances of the transaction sender and receiver.
```typescript
for (const txHash of block.transactionHashes) {
    const tx = await web3.tolar.getTransaction(txHash);
    console.log(`Transaction ${tx.transactionHash} from last block has gas used: ${tx.gasUsed}`);
    const senderBalance = await web3.tolar.getLatestBalance(tx.senderAddress);
    const receiverBalance = await web3.tolar.getLatestBalance(tx.receiverAddress);
    console.log(`Sender ${tx.senderAddress} balance: ${senderBalance.balance.toString()}`);
    console.log(`Receiver ${tx.receiverAddress} balance: ${receiverBalance.balance.toString()}`);
}
```