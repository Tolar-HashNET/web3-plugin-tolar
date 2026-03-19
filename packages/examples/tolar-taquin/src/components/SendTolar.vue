<template>
  <div>
    <button v-if="!walletConnected" @click="connectWallet">
      Connect Wallet
    </button>

    <p v-if="walletConnected">Balance: {{ balance }} TOL</p>
    <p v-if="walletConnected">Account: {{ account }}</p>
    
    <input v-model="receiver" placeholder="Receiver Address" />
    <input v-model="amount" type="number" placeholder="Amount" />
    
    <button @click="send">Send</button>
    
    <p v-if="error" style="color: red">{{ error }}</p>
    <p v-if="success" style="color: green">{{ success }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { NetworkId } from "@tolar/web3-plugin-tolar";

export default defineComponent({
  setup() {

    const receiver = ref('');
    const amount = ref('');
    const balance = ref('0');
    const error = ref('');
    const success = ref('');
    const network = ref('');

    const walletConnected = ref(false); // ADDED

    // @ts-ignore
    let taquin;
    const account = ref ('');

    // NEW FUNCTION
    const connectWallet = async () => {
      try {
        // @ts-ignore
        taquin = window.taquin;

        // @ts-ignore
     const accounts = await taquin.tolar.requestAccounts();

        account.value = accounts[0];
        walletConnected.value = true;

        await loadNetwork();
        await loadBalance();

      } catch (e: any) {
        error.value = e.message;
      }
    };

    const loadBalance = async () => {
      try {

        // @ts-ignore
     const bal = await taquin.tolar.getCurrentBalance();

        balance.value = (Number(bal) / 1e18).toFixed(2);

      } catch (e: any) {
        error.value = e.message;
      }
    };

    const loadNetwork = async () => {
      try {

        // @ts-ignore
     const net = await taquin.tolar.getNetwork();

        network.value = net.id;

      } catch (e: any) {
        error.value = e.message;
      }
    };

    const send = async () => {

      error.value = '';
      success.value = '';

      if (!walletConnected.value) {
        error.value = 'Please connect wallet first';
        return;
      }

      if (!receiver.value || !amount.value) {
        error.value = 'Please enter receiver and amount';
        return;
      }

      try {

        const tx = {
          receiverAddress: receiver.value,
          amount: (Number(amount.value) * 1e18).toString(),
          networkId: network.value || NetworkId.Testnet
        };

        // @ts-ignore
       const hash = await taquin.tolar.sendRawTransaction(tx);

        success.value = `Sent! Transaction hash: ${hash}`;

        receiver.value = '';
        amount.value = '';

        await loadBalance();

      } catch (e: any) {
        error.value = e.message;
      }
    };

    return {
      receiver,
      amount,
      balance,
      error,
      success,
      send,
      network,
      connectWallet,
      walletConnected,
      account
    };
  },
});
</script>