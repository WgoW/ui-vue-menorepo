# TON Connect UI Vue

TonConnect UI Vue is a Vue UI kit for TonConnect SDK. Use it to connect your app to TON wallets via TonConnect protocol in Vue apps.

If you don't use Vue for your app, take a look at [TonConnect UI](https://github.com/ton-connect/sdk/tree/main/packages/ui).

If you want to use TonConnect on the server side, you should use the [TonConnect SDK](https://github.com/ton-connect/sdk/tree/main/packages/sdk).

---
# Getting started

## Installation with npm
`npm i @tonconnect/ui-vue`

# Usage

## Add TonConnectUIProvider
Add TonConnectUIProvider to the root of the app. You can specify UI options using props.

All TonConnect UI hooks calls and `<TonConnectButton />` component must be placed inside `useProvide`.

```App.vue
<script setup lang="ts">
  import HelloWorld from './components/HelloWorld.vue'
  import {useProvide} from "tonconnect-tma-sdk-vue";
  const manifestUrl = 'https://<YOUR_APP_URL>/tonconnect-manifest.json'
  useProvide({
    manifestUrl,
  })
</script>

<template>
  <HelloWorld msg="Vite + Vue" />
</template>
```

## Add TonConnect Button
TonConnect Button is universal UI component for initializing connection. After wallet is connected it transforms to a wallet menu.
It is recommended to place it in the top right corner of your app.

```vue
<script setup lang="ts">
  import {TonConnectButton} from "@tonconnect/ui-vue"
</script>

<template>
  <TonConnectButton/>
</template>
```

You can add `className` and `style` props to the button as well. Note that you cannot pass child to the TonConnectButton.
`<TonConnectButton  class-name="my-button-class" :style={{ float: "right" }}/>`

## Use TonConnect UI hooks

### useTonAddress
Use it to get user's current ton wallet address. Pass boolean parameter isUserFriendly to choose format of the address. If wallet is not connected hook will return empty string.

```vue
<script setup lang="ts">
import { useTonAddress } from '@tonconnect/ui-vue';
const userFriendlyAddress = useTonAddress();
const rawAddress = useTonAddress(false);
</script>
<template>
  <div>
    <span>User-friendly address: {{userFriendlyAddress}}</span>
    <span>Raw address: {{rawAddress}}</span>
  </div>
</template>
```

### useTonWallet
Use it to get user's current ton wallet. If wallet is not connected hook will return null.

See all wallet's properties

[Wallet interface](https://ton-connect.github.io/sdk/interfaces/_tonconnect_sdk.Wallet.html)
[WalletInfo interface](https://ton-connect.github.io/sdk/types/_tonconnect_sdk.WalletInfo.html)

```vue
<script setup lang="ts">
  import { useTonWallet } from '@tonconnect/ui-vue';
  const wallet = useTonWallet();
</script>
<template>
  <div v-if="wallet">
    <span>Connected wallet: {{wallet.name}}</span>
    <span>Device: {{wallet.device.appName}</span>
  </div>
</template>
```

### useTonConnectModal

Use this hook to access the functions for opening and closing the modal window. The hook returns an object with the current modal state and methods to open and close the modal.

```vue
<script setup lang="ts">
  import { useTonConnectModal } from '@tonconnect/ui-vue';
  const { state, open, close } = useTonConnectModal();
</script>
<template>
  <div>
    <div>Modal state: {{state.value?.status}}</div>
    <button @click="open">Open modal</button>
    <button @click="close">Close modal</button>
  </div>
</template>
```

### useTonConnectUI
Use it to get access to the `TonConnectUI` instance and UI options updating function.

[See more about TonConnectUI instance methods](https://github.com/ton-connect/sdk/tree/main/packages/ui#send-transaction)

[See more about setOptions function](https://github.com/ton-connect/sdk/tree/main/packages/ui#change-options-if-needed)


### useIsConnectionRestored
Indicates current status of the connection restoring process.
You can use it to detect when connection restoring process if finished.

```vue
<script setup lang="ts">
  import { useIsConnectionRestored } from '@tonconnect/ui-vue';
</script>
<template>
  <Loader v-if="!connectionRestored">Please wait...</Loader>
  <MainPage v-else />
</template>
```

## Add connect request parameters (ton_proof)
Use `tonConnectUI.setConnectRequestParameters` function to pass your connect request parameters.

This function takes one parameter:

Set state to 'loading' while you are waiting for the response from your backend. If user opens connect wallet modal at this moment, he will see a loader.
```ts
const tonConnectUI = useTonConnectUI();

tonConnectUI.value.setConnectRequestParameters({
    state: 'loading'
});
```

or

Set state to 'ready' and define `tonProof` value. Passed parameter will be applied to the connect request (QR and universal link).
```ts
const tonConnectUI = useTonConnectUI();

tonConnectUI.value.setConnectRequestParameters({
    state: 'ready',
    value: {
        tonProof: '<your-proof-payload>'
    }
});
```

or

Remove loader if it was enabled via `state: 'loading'` (e.g. you received an error instead of a response from your backend). Connect request will be created without any additional parameters.
```ts
const tonConnectUI = useTonConnectUI();

tonConnectUI.value.setConnectRequestParameters(null);
```


You can call `tonConnectUI.setConnectRequestParameters` multiple times if your tonProof payload has bounded lifetime (e.g. you can refresh connect request parameters every 10 minutes).


```ts
const tonConnectUI = useTonConnectUI();

// enable ui loader
tonConnectUI.value.setConnectRequestParameters({ state: 'loading' });

// fetch you tonProofPayload from the backend
const tonProofPayload: string | null = await fetchTonProofPayloadFromBackend();

if (!tonProofPayload) {
    // remove loader, connect request will be without any additional parameters
    tonConnectUI.setConnectRequestParameters(null);
} else {
    // add tonProof to the connect request
    tonConnectUI.value.setConnectRequestParameters({
        state: "ready",
        value: { tonProof: tonProofPayload }
    });
}

```


You can find `ton_proof` result in the `wallet` object when wallet will be connected:

```vue
<script lang="ts" setup>
  import {onMounted} from "vue";
  import useTonConnectUI from "@tonconnect/ui-vue";
  const tonConnectUI = useTonConnectUI();

  onMounted(()=>{
    tonConnectUI.value.onStatusChange(wallet => {
      if (wallet.connectItems?.tonProof && 'proof' in wallet.connectItems.tonProof) {
        checkProofInYourBackend(wallet.connectItems.tonProof.proof, wallet.account);
      }
    })
  })
</script>
```

# Troubleshooting

## Android Back Handler

If you encounter any issues with the Android back handler, such as modals not closing properly when the back button is pressed, or conflicts with `history.pushState()` if you are manually handling browser history in your application, you can disable the back handler by setting `enableAndroidBackHandler` to `false`:

```vue
<script setup lang="ts">
  import HelloWorld from './components/HelloWorld.vue'
  import {useProvide} from "tonconnect-tma-sdk-vue";
  const manifestUrl = 'https://<YOUR_APP_URL>/tonconnect-manifest.json'
  useProvide({
    manifestUrl,
  })
</script>
```

This will disable the custom back button behavior on Android, and you can then handle the back button press manually in your application.

While we do not foresee any problems arising with the Android back handler, but if you find yourself needing to disable it due to an issue, please describe the problem in on [GitHub Issues](https://github.com/ton-connect/sdk/issues), so we can assist you further.

