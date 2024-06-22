<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import {useProvide} from "tonconnect-ui-vue";
const manifestUrl = 'https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json'

console.log('开始调用 useProvide', manifestUrl)
useProvide({
  manifestUrl,
})
</script>

<template>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
</style>
