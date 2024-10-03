# Web3.js Tolar Hashnet Plugin
[Web3.js](https://github.com/web3/web3.js) plugin for interacting with Tolar Hashnet network and accounts.

## Prerequisites
- [NodeJS](https://nodejs.org/) (LTS/Iron)
- [npm](https://www.npmjs.com/package/npm/v/10.8.2)
- [web3js 4.0 or higher](https://www.npmjs.com/package/web3)

## Installation
```bash
npm install @tolar/web3-plugin-tolar
```

## Usage
### Installing Peer Dependencies
```bash
# Install web3j
npm install web3
# Install web3-eth-accounts
npm install web3-eth-accounts
```
> **_NOTE_**
> The Tolar plugin incorporates account handling that is a thin wrapper around [web3-eth-accounts](https://github.com/web3/web3.js/tree/4.x/packages/web3-eth-accounts), so its dependency is necessary.

### Registering the Tolar plugin with a web3.js instance
First, we create a web3js object and set the provider to the local Tolar Hashnet network.\
The next step is to register the Tolar Hashnet plugin in accordance with the web3JS plugin [guide](https://docs.web3js.org/guides/web3_plugin_guide/plugin_users).
```typescript
const web3 = new Web3("http://127.0.0.1:8200/jsonrpc");
web3.registerPlugin(new TolarPlugin());
```

## Build Project
```bash
# Build
npm run build
# Lint
npm run lint
# Test
npm run test
```

## Examples
* [Send transaction using Tolar wallet](examples/wallet-send-transaction)
* [Send signed transaction without using wallet](examples/send-signed-transaction)
* [Deploy and execute contract](examples/smart-contract)
* [Using basic blockchain methods](examples/blockchain)


## Functionality

### Account and wallet
Tolar wallet fully implements web3 `Web3AccountProvider<Web3BaseWalletAccount>` for documentation please check official [web3js documentation](https://docs.web3js.org/guides/wallet/). 

### getBlockCount
Returns total number of block in blockchain.
#### Returns
Total number of blocks in blockchain.
```typescript
web3.tolar.getBlockCount();
```
```
> 100000
```

### getLatestBlock
Retrieves latest block from the blockchain.
#### Returns
Last block in blockchain.
```typescript
web3.tolar.getBlockCount();
```
```
> {
    "lastConfirmedBlockHash":"0x0cf69aab323c999667b6046b24bceb03b26f836b1ebc471e0f849936416ee493",
    "totalBlocksCount":430,
    "confirmedBlocksCount":430
  }
```

### getBlockByHash
Returns block by its hash.
#### Parameters
* `blockHash` - Hash of the block.
#### Returns
Block corresponding given hash.
```typescript
web3.tolar.getBlockByHash("0x97154e4144796a14db4dc5824cfb7602e53f09242949a82ace636af901d3b012");
```
```
> {
    "blockIndex": 92,
    "blockHash": "0x97154e4144796a14db4dc5824cfb7602e53f09242949a82ace636af901d3b012",
    "confirmationTimestamp": "2024-09-24T09:25:52.632Z",
    "previousBlockHash": "0x3900ba397061dd1620bca36bd69b2dd1aa15a9ecdcfc37205d2c5df34518774c",
    "transactionHashes": [
      "0x0687cb6f40f0f42aacb8890ee2b9ea3346745d15e0fddc0d4966211135807fee",
      "0x2bf569ea90b47f84a27694887a875f79a01adb0ecc68cb87b74fbfed08227c6b",
      "0x97478f7c47b65fecef4991eb35a75a76e58425dafccdb422e17aaafe7acc6c7b",
      "0xb629549166d2e6d3c36a73be1be41bc7b3bc04c783d51a282c4129f85cc5ff44",
      "0x27a23e6b6d039d4d64d9f14504a9e20ebfcf41cdf20c890bd85743f9261bcb85",
      "0x0caef07e80d1db1ed34fbb19236aa6301a5f64b0abb81802899be6b7a70c60bd",
      "0x2b92c86c12930dd1feab79f018aa8d690eeb4ffcc6059a839172e9de7e67e48b",
      "0xaaf2bf400220bdba45dd00521eadfadc95bbe86917ceba9dd02bb5b2c9df1c55"
    ]
  }
```

### getBlockByIndex
Returns block by its index.
#### Parameters
* `blockIndex` - Index of required block.
#### Returns
Block corresponding given index.
```typescript
web3.tolar.getBlockByIndex(92);
```
```
> {
    "blockIndex": 92,
    "blockHash": "0x97154e4144796a14db4dc5824cfb7602e53f09242949a82ace636af901d3b012",
    "confirmationTimestamp": "2024-09-24T09:25:52.632Z",
    "previousBlockHash": "0x3900ba397061dd1620bca36bd69b2dd1aa15a9ecdcfc37205d2c5df34518774c",
    "transactionHashes": [
      "0x0687cb6f40f0f42aacb8890ee2b9ea3346745d15e0fddc0d4966211135807fee",
      "0x2bf569ea90b47f84a27694887a875f79a01adb0ecc68cb87b74fbfed08227c6b",
      "0x97478f7c47b65fecef4991eb35a75a76e58425dafccdb422e17aaafe7acc6c7b",
      "0xb629549166d2e6d3c36a73be1be41bc7b3bc04c783d51a282c4129f85cc5ff44",
      "0x27a23e6b6d039d4d64d9f14504a9e20ebfcf41cdf20c890bd85743f9261bcb85",
      "0x0caef07e80d1db1ed34fbb19236aa6301a5f64b0abb81802899be6b7a70c60bd",
      "0x2b92c86c12930dd1feab79f018aa8d690eeb4ffcc6059a839172e9de7e67e48b",
      "0xaaf2bf400220bdba45dd00521eadfadc95bbe86917ceba9dd02bb5b2c9df1c55"
    ]
  }
```

### getGasEstimate
Executes given transaction and returns amount of used gas. After execution transaction is reverted.
#### Parameters
* `txRequest` - Transaction that is going to be estimated.
#### Returns
Gas estimation.
```typescript
web3.tolar.getGasEstimate({
    senderAddress: "0x546399121770646811e854d5393e0236e24721b80325050e12",
    receiverAddress: ZERO_HEX_ADDRESS,
    amount: 0n,
    networkId: NetworkId.Local,
    nonce: nonce,
    data: CONTRACT_BIN,
    gas: 53_000n,
    gasPrice: 1n
});
```
```
> 73_000n
```

### tryCallTransaction
Executes read only contract functions on evm without spending gas or having any effect to address balance and nonce.
#### Parameters
* `txRequest` 
#### Returns
* `RpcTryCallOutput` object having:
  * `output` The returned data of the call, e.g. a smart contract functions return value.
  * `excepted` True if exception happened, false if transaction execution was successful.

```typescript
web3.tolar.tryCallTransaction({
    senderAddress: "0x54598443f1880ef585b21f1d7585bd0577402861e5b8ad1379",
    receiverAddress: "0x5477db2bebba79db42a978f896968f4afce746ea1f88263637",
    amount: 0n,
    networkId: NetworkId.Local,
    nonce: nonce,
    data: web3.eth.abi.encodeFunctionCall(CONTRACT_ABI, [10]),
    gas: 53_000n,
    gasPrice: 1n
});
```
```
> 73_000n
```

### getBalance
Get balance for selected address on the specified block in the blockchain.
#### Parameters
* `address` - Address for which balance is needed.
* `blockIndex` - Index of block for which balance is required.
#### Returns
Balance for given address at block with specified index.
```typescript
web3.tolar.getBalance("0x544e83d2c43b3e10dc911df7ac2d462e5f9eeca8c3a84c5b7c", 47);
```
```
> {
    "balance": "1000000000000000000",
    "blockIndex": 47
  }
```

### getLatestBalance
Returns current balance for given address on last block in blockchain.
#### Parameters
* `address` - Address for which balance is needed.
#### Returns
Latest balance for given address.
```typescript
web3.tolar.getLatestBalance("0x544e83d2c43b3e10dc911df7ac2d462e5f9eeca8c3a84c5b7c");
```
```
> {
    "balance": "1000000000000000000",
    "blockIndex": 87
  }
```

### getNonce
Returns current balance for given address on last block in blockchain.
#### Parameters
* `address` - Address for which balance is needed.
#### Returns
Returns next available nonce value for given address.
```typescript
web3.tolar.getNonce("0x5412c347d6570bcdde3a89fca489f679b8b0ca22a5d4e3b6ca");
```
```
> 127
```

### getBlockchainInfo
Retrieves blockchain statistics information.
#### Returns
Provides basic information about blockchain.
```typescript
web3.tolar.getBlockchainInfo();
```
```
> {
    "lastConfirmedBlockHash": "0x327382b876e0efa06d63fdbe5fa07777b383e4319e08a22af378594ec59d26ae",
    "totalBlocksCount": 169,
    "confirmedBlocksCount": 169
  }
```

### getTransaction
Retrieves confirmed transaction information from the current node blockchain.
#### Parameters
* `transactionHash` - The hash for the requested transaction.
#### Returns
Retrieves confirmed transaction information from the current node blockchain.
```typescript
web3.tolar.getTransaction("0x6b6de48338fa8766f32157da866ae401d30ed4cc8e7b00d630ad23351a019824");
```
```
> {
    "transactionHash": "0x6b6de48338fa8766f32157da866ae401d30ed4cc8e7b00d630ad23351a019824",
	"blockHash": "0x7ed9875ffb1c0a228b638b288323f198d503f21cd06fbb38c5b03edc8d30c76a",
	"transactionIndex": 0,
	"senderAddress": "0x5412c347d6570bcdde3a89fca489f679b8b0ca22a5d4e3b6ca",
	"receiverAddress": "0x544e83d2c43b3e10dc911df7ac2d462e5f9eeca8c3a84c5b7c",
	"value": "1000000000000000000",
	"gas": "21000",
	"gasPrice": "1",
	"data": "0x",
	"nonce": "5",
	"networkId": 0,
	"confirmationTimestamp": "2024-09-30T13:20:37.047Z",
	"gasUsed": "21000",
	"gasRefunded": "0",
	"newAddress": "0x54000000000000000000000000000000000000000023199e2b",
	"output": "0x",
	"excepted": false,
	"exception": 0
  }
```

### getTransactionList
Retrieves most recent transaction list based on transaction limit and how many transactions to skip.
#### Parameters
* `addresses` - List of all addresses by which transaction should be filtered (leave empty to apply no filter and return all transactions).
* `limit` - Maximum number of transactions to return in one batch (no more than 1000).
* `skip` - Number of most recent transactions to skip starting from blockchain’s last confirmed block.
#### Returns
Requested transactions.
```typescript
web3.tolar.getTransaction("0x6b6de48338fa8766f32157da866ae401d30ed4cc8e7b00d630ad23351a019824");
```
```
> {
    "transactionHash": "0x6b6de48338fa8766f32157da866ae401d30ed4cc8e7b00d630ad23351a019824",
	"blockHash": "0x7ed9875ffb1c0a228b638b288323f198d503f21cd06fbb38c5b03edc8d30c76a",
	"transactionIndex": 0,
	"senderAddress": "0x5412c347d6570bcdde3a89fca489f679b8b0ca22a5d4e3b6ca",
	"receiverAddress": "0x544e83d2c43b3e10dc911df7ac2d462e5f9eeca8c3a84c5b7c",
	"value": "1000000000000000000",
	"gas": "21000",
	"gasPrice": "1",
	"data": "0x",
	"nonce": "5",
	"networkId": 0,
	"confirmationTimestamp": "2024-09-30T13:20:37.047Z",
	"gasUsed": "21000",
	"gasRefunded": "0",
	"newAddress": "0x54000000000000000000000000000000000000000023199e2b",
	"output": "0x",
	"excepted": false,
	"exception": 0
  }
```

### getPastEvents
Returns emitted events by the contract.
#### Parameters
* `address` - Address of the contract.
* `topic` - Keccak256 of the event name and arguments.
#### Returns
Contracts emitted events.
```typescript
web3.tolar.getPastEvents(
    "0x5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb", 
    "0x0d13800e76908f21833df64e9bc413caf783ec15c3453f1e5f7666187a326928"
);
```
```
> [
    {
      "address": "0x5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb",
      "topic": "0x0d13800e76908f21833df64e9bc413caf783ec15c3453f1e5f7666187a326928",
      "topicArg0": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "topicArg1": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "topicArg2": "0x00000000000000000000000034dcc69921b8bacf14017b4289820150a4a42aaa",
      "data": "0x74686973206973206669727374206c617374206576656e74",
      "transactionHash": "0x3114c475957d5353ef70715336c5bf4c25e250287f2d79a34a1a4d03414643dd",
      "blockHash": "0x0d928eeb95baa6ce0ad292b3dc0f0b050ae0429cc8da1af906658f1bc2072106",
      "blockIndex": 12345
    },
    {
      "address": "0x5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb",
      "topic": "0x0d13800e76908f21833df64e9bc413caf783ec15c3453f1e5f7666187a326928",
      "topicArg0": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "topicArg1": "0x00000000000000000000000034dcc69921b8bacf14017b4289820150a4a42aa6",
      "data": "0x74686973206973207365636f6e64206c617374206576656e74",
      "transactionHash": "0x3114c475957d5353ef70715336c5bf4c25e250287f2d79a34a1a4d0341464333",
      "blockHash": "0x0d928eeb95baa6ce0ad292b3dc0f0b050ae0429cc8da1af906658f1bc2072106",
      "blockIndex": 12345
    }
]
```

### getTransactionReceipt
Retrieves transaction receipt information from the blockchain.
#### Parameters
* `transactionHash` - The hash for requested transaction receipt.
#### Returns
Transaction receipt.
```typescript
web3.tolar.getTransactionReceipt("0x5ab70e032db7303b1de31147602970098c21c75904e7281e89cde960d5ede1d1");
```
```
> {
  "excepted": false,
  "blockHash": "0x998666a2af4e03f941799a778550d217eb021a0e3daf35eedec5cc2a477a6b3b",
  "blockIndex": 23,
  "transactionHash": "0x5ab70e032db7303b1de31147602970098c21c75904e7281e89cde960d5ede1d1",
  "transaction_index": 1,
  "senderAddress": "0x5484c512b1cf3d45e7506a772b7358375acc571b2930d27deb",
  "receiverAddress": "0x5456a09d5c06e23ec6a71a7db606549ec4bde1788c71a9552b",
  "newAddress": "0x54000000000000000000000000000000000000000023199e2b",
  "gasUsed": 21000,
  "logs": [
    {
      "address": "0x5456a09d5c06e23ec6a71a7db606549ec4bde1788c71a9552b",
      "topics": [
        "0x324591e46c0cd422e42a223fbdaf9117beefd35b5f20a2b908afff711bd55bee",
        "0x00000000000000000000000012c347d6570bcdde3a89fca489f679b8b0ca22a5",
        "0x0000000000000000000000000000000000000000000000000000000000000008"
      ],
      "data": "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000056578747261000000000000000000000000000000000000000000000000000000"
    }
  ],
  "exception": 0
}
```

### getPeerCount
Get current peer count in running HashNet network.
#### Returns
Number of peers on network.
```typescript
web3.tolar.getPeerCount();
```
```
> 8
```

### getMasterNodeCount
Get current master nodes count in running HashNet network.
#### Returns
Master node count.
```typescript
web3.tolar.getMasterNodeCount();
```
```
> 8
```

### isMasterNode
Check if this service is tolar HashNet master node.
#### Returns
Master node count.
```typescript
web3.tolar.isMasterNode();
```
```
> false
```

### sendSignedTransaction
Send signed transaction.
#### Parameters
* `signedTransaction`
#### Returns
Hash of created transaction that can be used to obtain information about created transaction.
```typescript
web3.tolar.sendSignedTransaction("0x0a7f0a323534313235316236613766396337626439613739353266336466323532623164633462373063353464386233306430616430123235346634366436313839373335616466343266363730383864336633626238336137333639633934363265663966346230331a012a22030186a02a01013201013a010040eaadc0e52412ca020a4033376232363961376632663831326261326134373961346437393162306465643162313437383031316661333063623535313364666536306637643334306436128201383235383661653739306334656435366534356635343736316365346434636463633237623462623664333931333733653365396366333766333164326562653230383763303366363265333065623437393064343337643436633134663136343437656262616462613964333764336537323937663332303637303162643430301a80013438633138376530643362613531343531626432323465383561633134326137656638626662386161356663343334303761363164353535336562363263363838353131316537653162396234326365663166373438383532303330613734363230623565616233343432373664336230373863626335356264386238306263");
```
```
> "0xf5b6f598c0a968162dfdf8ec33c93171408bac411d833840b9df0bbefbf3ae7f"
```

