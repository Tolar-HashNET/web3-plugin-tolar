<template>
  <div>
    <p>Balance: {{ balance }} TOL</p>
    
    <input v-model="receiver" placeholder="Receiver Address" />
    <input v-model="amount" type="number" placeholder="Amount" />
    
    <button @click="send">Send</button>
    
    <p v-if="error" style="color: red">{{ error }}</p>
    <p v-if="success" style="color: green">{{ success }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { NetworkId } from "@tolar/web3-plugin-tolar";


export default defineComponent({
  setup() {
    const receiver = ref('');
    const amount = ref('');
    const balance = ref('0');
    const error = ref('');
    const success = ref('');

    // @ts-ignore
    let taquin;
    let account = '';

    const initTaquin = async () => {
      // @ts-ignore
      taquin = window.taquin;
      // @ts-ignore
      const accounts = await taquin.tolar.request({method: 'tol_requestAccounts'});
      account = accounts[0];
    }

    const loadBalance = async () => {
      try {
        await initTaquin();
        // @ts-ignore
        const bal = await taquin.tolar.request({method: 'tol_getCurrentBalance'});

        balance.value = (Number(bal) / 1e18).toFixed(2);
      } catch (e: any) {
        error.value = e.message;
      }
    };

    const send = async () => {
      error.value = '';
      success.value = '';
      if (!account) {
        error.value = 'Wallet account not found';
        return;
      }
      if (!receiver.value || !amount.value) {
        error.value = 'Please enter receiver and amount';
        return;
      }

      try {
        // @ts-ignore
        await loadBalance();

        const tx = {
          receiverAddress: receiver.value,
          amount: (Number(amount.value) * 1e18).toString(),
          networkId: NetworkId.Testnet
        };

        // @ts-ignore
        const hash = await taquin.tolar.request({
          method: 'tol_sendRawTransaction',
          params: [tx]
        });

        success.value = `Sent! Transaction hash: ${hash}`;

        // Reset input
        receiver.value = '';
        amount.value = '';

        // Refresh balance
        await loadBalance();
      } catch (e: any) {
        error.value = e.message;
      }
    };

    // Auto-load balance on mount
    onMounted(loadBalance);

    return { receiver, amount, balance, error, success, send };
  },
});
</script>
