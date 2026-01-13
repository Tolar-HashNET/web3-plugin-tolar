<template>
  <div>
    <h1>Taquin</h1>
    <SendTolar />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SendTolar from './components/SendTolar.vue';

export default defineComponent({
  components: {
    SendTolar
  }
});
</script>