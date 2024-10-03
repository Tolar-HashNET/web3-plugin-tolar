# Tolar Wallet Send Transaction 
The purpose of this example is to demonstrate how to send a simple transaction signed by wallet to Tolar Hashnet and verify if it has been confirmed.

## Overview
Short overview of example:
1. Prerequisites
2. Build example
3. Registering the Tolar plugin with a web3.js instance
4. Create accounts using wallet
5. Send transaction
6. Wait for confirmation

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

### Step 4: Create accounts using wallet
Two accounts were created using the wallet provided by the Tolar plugin. The format of Tolar addresses differs from Ethereum addresses.\
It should be noted that private key string constants are used to create accounts, which is strongly discouraged for security reasons.
```typescript
const tolarWallet = web3.tolar.wallet!;
tolarWallet.add("0x67f3c68cedd11ef77ed6b92ca9fd82c699ccfc5f1fd96fa485b0ffeb2cf60fdf");
tolarWallet.add("0x58ae019b967976b92d0624a370ff6573eedbcc2a6b49ea4fa694cfa760f69118");
```

### Step 5: Send transaction
The transaction was sent from the Genesis account to another local wallet account. It is simple found transfer transaction.
```typescript
const sender = tolarWallet[0].address;
const receiver = tolarWallet[1].address;

const transactionHash = await web3.tolar.sendTransaction({from: sender, to: receiver, value: 1000000000000000000n, networkId: NetworkId.Local});
```

### Step 6: Wait for confirmation
When transaction is successfully sent we obtain transaction hash which is used to repeatedly interrogate network for transaction receipt. 
```typescript
for(let i = 0; i < 10; ++i) {
    try {
        const confirmedTx = await web3.tolar.getTransaction(transactionHash);
        console.log(`Transaction ${confirmedTx.transactionHash} is confirmed at block ${confirmedTx.blockHash}`);
        break;
    } catch (ex) {
        console.trace(ex);
        await new Promise(f => setTimeout(f, 2000));
    }
}
```
