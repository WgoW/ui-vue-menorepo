<script setup lang="ts">
defineOptions({
  name: 'TonConnectButton',
  inheritAttrs: false
})
import {useTonConnectUI} from "../hooks";
import {CSSProperties, onMounted} from "vue";

const buttonRootId = 'ton-connect-button';

export interface TonConnectButtonProps {
  className?: string;
  style?: CSSProperties;
}
defineProps<TonConnectButtonProps>()

onMounted(() => {
  useTonConnectUI(buttonRootId);
})

</script>

<template>
  <div
      :id="buttonRootId"
      :class="className"
      :style="{
        width: 'fit-content',
        ...style
      }">
  </div>
</template>

<style scoped>

</style>